// Service pour faire des requêtes HTTP avec gestion des tokens
export const httpRequester = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, body) => request("POST", endpoint, body),
  postFormData: (endpoint, formData) => requestFormData("POST", endpoint, formData),
  patch: (endpoint, body) => request("PATCH", endpoint, body),
  patchFormData: (endpoint, formData) => requestFormData("PATCH", endpoint, formData),
  put: (endpoint, body) => request("PUT", endpoint, body),
  delete: (endpoint) => request("DELETE", endpoint),
};
// Fonction générique pour faire des requêtes HTTP
async function request(method, endpoint, body) {
  const accessToken = localStorage.getItem("token");
  // Configuration de la requête
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...accessToken && { Authorization: `Bearer ${accessToken}` },
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Gestion des erreurs HTTP
  if (!response.ok) {
    console.error(response);
    throw new Error(`Failed to fetch ${method} ${endpoint}: ${response.statusText}`);
  }

  // Some API routes do not return a body
  if (! response.headers.get("Content-Type")?.includes("application/json")) {
    return null;
  }
  
  return await response.json();
}

// Fonction spécifique pour les uploads de fichiers (FormData)
async function requestFormData(method, endpoint, formData) {
  const accessToken = localStorage.getItem("token");
  
  // Configuration de la requête pour FormData
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      // Ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: formData,
  });
  
  // Gestion des erreurs HTTP
  if (!response.ok) {
    console.error('FormData request failed:', response);
    throw new Error(`Failed to fetch ${method} ${endpoint}: ${response.statusText}`);
  }

  // Some API routes do not return a body
  if (!response.headers.get("Content-Type")?.includes("application/json")) {
    return null;
  }
  
  return await response.json();
}
