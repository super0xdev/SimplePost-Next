import { connect } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
const Model = require("../../models/model");

export async function POST(req) {
  await connect();
  const body = await req.json();
  const res = await Model.findOneAndDelete({ _id: body._id });
  return NextResponse.json("Successfull");
}
