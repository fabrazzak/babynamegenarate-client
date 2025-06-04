import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AdBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const adElement = adRef.current;

    // Check if the ad is already initialized
    if (!adElement?.getAttribute('data-adsbygoogle-status')) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsense error:', e);
      }
    }
  }, []);

  return (   

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7987554086610229"
        data-ad-slot="5903461119"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      ></ins>
   
  );
};

export default AdBanner;
