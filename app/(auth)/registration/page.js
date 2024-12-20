"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { division } from "@/app/api/division";
import { district } from "@/app/api/district";
import { bloodGroups } from "@/app/api/bloodGroup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { registrationSchema } from "@/schemas/registrationSchema";
import "@/app/globals.css";

export const passwordRules = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /\d/,
  special: /[@$!%*?&]/,
};

const Registration_Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const { toast } = useToast();
  const [passwordErrors, setPasswordErrors] = useState({
    lowercase: true,
    uppercase: true,
    digit: true,
    special: true,
  });
  const [selectedDivisionId, setSelectedDivisionId] = useState(null);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      bloodGroup: "",
      division: "",
      district: "",
      password: "",
    },
  });

  const handleDivisionChange = (value) => {
    const selectedDivision = division.find(
      (division) => division.name === value
    );
    const divisionId = selectedDivision ? selectedDivision.id : null;
    setSelectedDivisionId(divisionId);

    form.setValue("division", value);

    form.setValue("district", "");
  };

  const filteredDistricts = district.filter(
    (d) => d.division_id === selectedDivisionId
  );

  const updatePasswordErrors = (password) => {
    setPasswordErrors({
      lowercase: !passwordRules.lowercase.test(password),
      uppercase: !passwordRules.uppercase.test(password),
      digit: !passwordRules.digit.test(password),
      special: !passwordRules.special.test(password),
    });
  };
  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    setIsLoading(true);

    const { username, email, bloodGroup, division, district, password } =
      values;
    const saveUserData = {
      username,
      email,
      password,
      bloodGroup,
      address: {
        division: division,
        district: district,
      },
      bloodDonationAbility: values.bloodDonationAbility,
    };

    try {
      const response = await axios.post("/api/registration", saveUserData);

      toast({
        title: "Registration successful",
        description:
          response.data.message ?? "We've created your account for you.",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering user:", error);

      if (error?.response?.data?.error === "Username already exists") {
        toast({
          title: "Registration failed",
          description:
            error?.response?.data?.error ?? "Username already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        setRegistrationError(
          error?.response?.data?.error ?? "Username already exists"
        );
        return;
      } else if (error?.response?.data?.error === "Email already exists") {
        toast({
          title: "Registration failed",
          description: error?.response?.data?.error ?? "Email already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        setRegistrationError(
          error?.response?.data?.error ?? "Email already exists"
        );
        return;
      }

      toast({
        title: "Registration failed",
        description:
          "An error occurred while registering the user." +
          error?.response?.data?.error,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="xl:ml-8 flex flex-col justify-center items-center  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 grid grid-cols-1 justify-items-start w-full"
        >
          <FormField
            className=""
            control={form.control}
            name="username"
            {...form.register("username", {
              required: {
                value: true,
                message: "Please enter a username.",
              },
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-60 "
                    type="text"
                    placeholder="enter your username😎............................"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {registrationError === "Username already exists" && (
                  <div className="text-red-500">{registrationError}</div>
                )}
              </FormItem>
            )}
          />
          <FormField
           
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-60"
                    type="text"
                    placeholder="enter your email📧"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {registrationError === "Email already exists" && (
                  <div className="text-red-500">{registrationError}</div>
                )}
              </FormItem>
            )}
          />

          <FormField
            className="w-full"
            control={form.control}
            name="bloodGroup"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Select Your Blood Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-[#737373] w-60">
                      <SelectValue placeholder="Your Blood Group🩸" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodGroups.map((bg, index) => (
                      <SelectItem
                        key={index}
                        value={bg}
                      >
                        {bg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            className="w-full"
            control={form.control}
            name="bloodDonationAbility"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Please select your blood donation ability</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={true} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        I am able to donate blood.
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={false} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        I am not able to donate blood.
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Give us your Address🏠</FormLabel>
                <Select
                  onValueChange={(value) => {
                    handleDivisionChange(value);
                    field.onChange;
                  }}
                  // onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-[#737373] w-60 ">
                      <SelectValue placeholder="Select your Division" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="Select Your Division"
                      disabled
                    >
                      Select Your Division
                    </SelectItem>
                    {division.map((division) => (
                      <SelectItem
                        key={division.id}
                        value={division.name}
                      >
                        {division.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Please select your division</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {filteredDistricts.length > 0 && (
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-[#737373] w-60">
                        <SelectValue placeholder="Select your District" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredDistricts.map((dist) => (
                        <SelectItem
                          key={dist.id}
                          value={dist.name}
                        >
                          {dist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Please select your district</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="w-60"
                    type="password"
                    placeholder="enter your password🗝️"
                    name="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      updatePasswordErrors(e.target.value);
                    }}
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <ul>
                    <FormMessage />
                    {Object.entries(passwordErrors).map(([key, value]) => (
                      <ul key={key}>
                        <li className="text-red-600 text-xs pl-3 ">
                          {" "}
                          {value && `Password must contain at least one ${key}`}
                        </li>
                      </ul>
                    ))}
                  </ul>
                )}
              </FormItem>
            )}
          />
          <Button
            className="justify-self-center"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Registration_Page;
