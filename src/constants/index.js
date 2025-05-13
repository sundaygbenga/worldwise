// export const BASE_URL = "http://localhost:5500/api/v1";
export const BASE_URL = "https://worldwise-api-8603.onrender.com/api/v1";
// export const AUTH_TOKEN =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBkMDc0MDY4ZGJiMjhhNjA1ZTcwMWQiLCJ1c2VyRW1haWwiOiJhdGVyZXN1bmRheTIwMTZAZ21haWwuY29tIiwiaWF0IjoxNzQ3MDY0NjY0LCJleHAiOjE3NDcxNTEwNjR9.cawLfKvJh5yAQF1wnM0Ovhjs59EZqNH4KnkDMbQs9y4";

const AUTH_TOKEN = localStorage.getItem("access_token") || "";
export const headers = {
	"content-type": "application/json",
	Authorization: `Bearer ${AUTH_TOKEN}`,
};
