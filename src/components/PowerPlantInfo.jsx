import React from 'react';
import plantImage from '../assets/powerplant.png';
import { useTranslation } from 'react-i18next';

const PowerPlantInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 mt-4 rounded shadow flex flex-col md:flex-row items-center gap-6">
      {/* Left: Info */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-green-700">{t('power_plant_info.title')}</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>{t('power_plant_info.name')}:</strong> {t('power_plant_info.name_value')}</li>
          <li><strong>{t('power_plant_info.location')}:</strong> {t('power_plant_info.location_value')}</li>
          <li><strong>{t('power_plant_info.capacity')}:</strong> {t('power_plant_info.capacity_value')}</li>
          <li><strong>{t('power_plant_info.status')}:</strong> {t('power_plant_info.status_value')}</li>
          <li><strong>{t('power_plant_info.operator')}:</strong> {t('power_plant_info.operator_value')}</li>
          <li><strong>{t('power_plant_info.commissioning_date')}:</strong> {t('power_plant_info.commissioning_date_value')}</li>
          <li><strong>{t('power_plant_info.description')}:</strong> {t('power_plant_info.description_value')}</li>
        </ul>
      </div>

      {/* Right: Image */}
      <div className="flex-1">
        <img
          src={plantImage}
          alt={t('power_plant_info.alt')}
          className="rounded-lg shadow-md w-full h-auto object-cover max-h-[300px]"
        />
      </div>
    </div>
  );
};

export default PowerPlantInfo;


