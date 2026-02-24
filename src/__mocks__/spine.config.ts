import type { Config } from "@/config";

export default {
  plugin: [
    {
      include: "*.ts",
      name: "@juun-roh/spine-typescript",
    },
    {
      include: "*.tsx",
      name: "@juun-roh/spine-tsx",
    },
  ],
} satisfies Config;
