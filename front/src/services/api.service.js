/* ======================================================
   API SERVICE – CINÉDÉLICES (COMPLET & FINAL)
====================================================== */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ======================================================
   AUTH HEADERS
====================================================== */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* ======================================================
   SAFE RESPONSE PARSER
====================================================== */
const parseResponse = async (res) => {
  const contentType = res.headers.get("content-type") || "";

  if (res.status === 204) return null;

  if (!res.ok) {
    let payload = "Erreur API";
    try {
      if (contentType.includes("application/json")) {
        const json = await res.json();
        payload = json?.error || json?.message || JSON.stringify(json);
      } else {
        payload = await res.text();
      }
    } catch { /* empty */ }
    throw new Error(payload);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
};

/* ======================================================
   API
====================================================== */
export const api = {
  /* =========================
     AUTH
  ========================= */
  login: async ({ identifier, password }) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await parseResponse(res);
    localStorage.setItem("token", data.token);

    const meRes = await fetch(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    const me = await parseResponse(meRes);
    localStorage.setItem("me", JSON.stringify(me));
    return me;
  },

  register: async ({ username, password, email }) => {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    return parseResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  updateMe: async (payload) => {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    return parseResponse(res);
  },

  deleteMe: async () => {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("me");
  },

  /* =========================
     SEARCH
  ========================= */
  search: async (query = "", sort = "recent") => {
    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&sort=${sort}`,
      { headers: getAuthHeaders() }
    );
    return parseResponse(res);
  },

  /* =========================
     RECIPES (PUBLIC)
  ========================= */
  getAllRecipes: async () => {
    const res = await fetch(`${BASE_URL}/recipes`);
    return parseResponse(res);
  },

  getRecipeById: async (id) => {
    const res = await fetch(`${BASE_URL}/recipes/${id}`);
    return parseResponse(res);
  },

  createRecipe: async (formData) => {
    const res = await fetch(`${BASE_URL}/recipes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return parseResponse(res);
  },

  updateRecipe: async (id, formData) => {
    const res = await fetch(`${BASE_URL}/recipes/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: formData,
    });
    return parseResponse(res);
  },

  deleteRecipe: async (id) => {
    const res = await fetch(`${BASE_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  /* =========================
     RECIPES (ADMIN)
  ========================= */
  getPendingRecipes: async () => {
    const res = await fetch(`${BASE_URL}/recipes/admin/pending`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  validateRecipe: async (id) => {
    const res = await fetch(
      `${BASE_URL}/recipes/admin/${id}/validate`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
      }
    );
    return parseResponse(res);
  },

  /* =========================
     MEDIAS (PUBLIC)
  ========================= */
  getAllMedias: async () => {
    const res = await fetch(`${BASE_URL}/medias`);
    return parseResponse(res);
  },

  getMediaById: async (id) => {
    const res = await fetch(`${BASE_URL}/medias/${id}`);
    return parseResponse(res);
  },

  createMedia: async (formData) => {
    const res = await fetch(`${BASE_URL}/medias`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return parseResponse(res);
  },

  updateMedia: async (id, formData) => {
    const res = await fetch(`${BASE_URL}/medias/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: formData,
    });
    return parseResponse(res);
  },

  deleteMedia: async (id) => {
    const res = await fetch(`${BASE_URL}/medias/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  /* =========================
     MEDIAS (ADMIN)
  ========================= */
  getPendingMedias: async () => {
    const res = await fetch(`${BASE_URL}/medias/admin/pending`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  validateMedia: async (id) => {
    const res = await fetch(
      `${BASE_URL}/medias/admin/${id}/validate`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
      }
    );
    return parseResponse(res);
  },

  /* =========================
     INGREDIENTS (PUBLIC)
  ========================= */
  getAllIngredients: async () => {
    const res = await fetch(`${BASE_URL}/ingredients`);
    return parseResponse(res);
  },

  getIngredientById: async (id) => {
    const res = await fetch(`${BASE_URL}/ingredients/${id}`);
    return parseResponse(res);
  },

  createIngredient: async ({ name, culinary_profile }) => {
  if (!name || !name.trim()) {
    throw new Error("Nom de l’ingrédient obligatoire");
  }

  const payload = {
    name: name.trim(),
    culinary_profile: culinary_profile || "neutre",
  };

  const res = await fetch(`${BASE_URL}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(res);
},


  updateIngredient: async (id, payload) => {
    const res = await fetch(`${BASE_URL}/ingredients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    return parseResponse(res);
  },

  deleteIngredient: async (id) => {
    const res = await fetch(`${BASE_URL}/ingredients/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  /* =========================
     INGREDIENTS (ADMIN)
  ========================= */
  getPendingIngredients: async () => {
    const res = await fetch(`${BASE_URL}/ingredients/admin/pending`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(res);
  },

  validateIngredient: async (id) => {
    const res = await fetch(
      `${BASE_URL}/ingredients/admin/${id}/validate`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
      }
    );
    return parseResponse(res);
  },
};
