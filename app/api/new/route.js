import { connect } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
const Model = require("../../models/model");

export async function POST(req) {
  await connect();
  const body = await req.json();
  const newPost = new Model({
    content: body.data,
  });
  await newPost.save();
  return NextResponse.json("Successfull");
}
