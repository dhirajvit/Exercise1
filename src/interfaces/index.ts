type driveType = "2wd" | "4wd" | "awd";

export interface Car {
  brand: string;
  color: string;
  engineSize: number;
  drive: driveType;
  url?: string;
}

