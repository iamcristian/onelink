import colors from "colors";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI!);
    const url = `${connection.host}:${connection.port}/${connection.name}`;
    console.log(colors.grey.bold(`MongoDB connected: ${url}`));
  } catch (error) {
    if (error instanceof Error)
      console.log(colors.bgRed.white.bold(error.message));

    process.exit(1);
  }
};
