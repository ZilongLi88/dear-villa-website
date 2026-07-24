"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "../locales/en";
import { zhCN } from "../locales/zh-CN";

export const LANGUAGE_STORAGE_KEY = "dear-villa-language";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      en,
      "zh-CN": zhCN,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
