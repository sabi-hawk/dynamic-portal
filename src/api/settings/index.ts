import API from "../index";

interface PortalSettingsPayload {
  instituteName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  instituteType?: string;
  portalPermissions?: any; // To allow for nested objects
}

export const getPortalSettings = () => API.get("/settings/portal");

export const updatePortalSettings = (payload: FormData) =>
  API.put("/settings/portal", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
