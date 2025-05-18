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
}

export const getPortalSettings = () => API.get("/settings/portal");

export const updatePortalSettings = (payload: PortalSettingsPayload) =>
  API.put("/settings/portal", payload);
