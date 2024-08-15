import { getBaseUrl } from "@/utils";

export const DashboardService = {
  getDashboardData: async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("error");
    }

    const data = await response.json();
    return data;
  },
};
