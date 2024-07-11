import { SignIn } from "@clerk/nextjs";
import { Component } from "lucide-react";

export default function Page() {
  return(
    <><SignIn />
    <Component/></>
  ) ;
}