"use client";

import * as React from "react";
import { List } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ListToggle() {
  return (
    <Button variant="ghost" size="icon">
      <List />
    </Button>
  );
}
