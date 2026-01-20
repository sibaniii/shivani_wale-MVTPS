import client from "./client";

// =======================
// Auth Endpoints
// =======================

// Login: backend decides role, returns { access, refresh, user, role }
export const login = (payload) => client.post("/login/", payload);

// Register new user
export const register = (payload) => client.post("/register/", payload);

// Optional: Refresh token (if your backend supports it)
export const refreshToken = (payload) => client.post("/token/refresh/", payload);

// =======================
// Vessels
// =======================
export const getVessels = () => client.get("/vessels/");
export const createVessel = (payload) => client.post("/vessels/", payload);

// =======================
// Ports
// =======================
export const getPorts = () => client.get("/ports/");

// =======================
// Companies
// =======================
export const getCompanies = () => client.get("/companies/");

// =======================
// Insurers
// =======================
export const getInsurers = () => client.get("/insurers/");