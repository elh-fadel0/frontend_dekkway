import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ignorer les erreurs d'apostrophes et guillemets non échappés
      "react/no-unescaped-entities": "off",
      
      // Ignorer les variables non utilisées qui commencent par un underscore
      "@typescript-eslint/no-unused-vars": "off",
      
      // Ignorer les erreurs liées à l'utilisation de 'any'
      "@typescript-eslint/no-explicit-any": "off",
      
      // Ignorer les avertissements liés à l'utilisation de <img> au lieu de <Image>
      "@next/next/no-img-element": "off",
      
      "@typescript-eslint/no-explicit-any": "off",
      // Ignorer les avertissements liés aux dépendances manquantes dans useEffect
      "react-hooks/exhaustive-deps": "off",
      
      // Ignorer les erreurs de commentaires dans les balises JSX
      "react/jsx-no-comment-textnodes": "off"
    }
  }
];

export default eslintConfig;
