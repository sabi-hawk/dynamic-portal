import { useAppState } from "hooks";

/**
 * Hook to check if a particular feature is enabled for a specific portal type
 * as defined in the saved portal settings (redux persist).
 *
 * @param portalType one of 'adminPortal' | 'teacherPortal' | 'studentPortal'
 * @param featureKey the feature key string you are validating
 * @returns boolean – true if the portal is enabled AND the featureKey exists in its feature list.
 */
export const useHasFeature = (
  portalType: "adminPortal" | "teacherPortal" | "studentPortal",
  featureKey: string
): boolean => {
  const {
    settings: { portalSettings },
  } = useAppState();

  if (!portalSettings) return false;

  const portalPerm: any = (portalSettings as any).portalPermissions?.[
    portalType
  ];
  if (!portalPerm || portalPerm.enabled === false) return false;

  return Array.isArray(portalPerm.features)
    ? portalPerm.features.includes(featureKey)
    : false;
};
