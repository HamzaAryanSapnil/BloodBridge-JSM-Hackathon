import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const donor = await request.json();
    console.log(donor);
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username: { $regex: `^${donor.username}$`, $options: "i" },
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const existingVerifiedUserByEmail = await UserModel.findOne({
      email: donor.email,
    });

    if (existingVerifiedUserByEmail) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(donor.password, 10);

    const user = new UserModel({
      username: donor?.username,
      email: donor?.email,
      password: hashedPassword,
      bloodGroup: donor?.bloodGroup,
      bloodDonationAbility: donor?.bloodDonationAbility,
      address: donor?.address,
      role: "donor",
      status: "active",
    });

    const savedUser = await user.save();
    console.log(savedUser);
    return Response.json(
      { message: `${savedUser?.username ?? "User"} registered successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Error creating user" }, { status: 500 });
  }
}
