import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={changeLanguage}
      value={i18n.language}
      className="bg-white text-black p-1 rounded"
    >
      <option value="en">🇬🇧 English</option>
      <option value="hi">🇮🇳 हिंदी</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="ml">🇮🇳 മലയാളം</option>
    </select>
  );
}

export default LanguageSelector;

