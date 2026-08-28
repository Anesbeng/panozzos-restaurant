import { API_BASE } from "../config";

/**
 * Laravel's asset() helper bakes an absolute URL into image_url /
 * model_3d_url using the backend's APP_URL (often "127.0.0.1" or
 * "localhost" in local dev). That works fine on the same machine the
 * backend runs on, but breaks on any other device — a phone on the
 * same WiFi, for instance, since 127.0.0.1 on the phone means "the
 * phone itself," not your dev PC.
 *
 * This rewrites any such URL to go through API_BASE instead (which
 * you set to your machine's real LAN IP, e.g. 192.168.1.6), so the
 * same code works whether you're testing on desktop or on a phone.
 */
export const resolveUrl = (path) => {
  if (!path) return path;

  // Extract everything after "/storage/" whether the URL is absolute or relative
  const storageIndex = path.indexOf("/storage/");
  if (storageIndex === -1) return path; // doesn't look like a storage path at all

  const cleanPath = path.slice(storageIndex + "/storage/".length);
  return `${API_BASE}/api/media/${cleanPath}`;
};
