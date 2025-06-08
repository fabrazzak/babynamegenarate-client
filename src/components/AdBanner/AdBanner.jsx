import { useEffect, useRef } from "react";

const AdBanner = () => {
  const adRef = useRef(null);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   try {
  //     if (window.adsbygoogle && adRef.current) {
  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //     }
  //   } catch (e) {
  //     console.error("Adsense error:", e);
  //   }
  // }, []);

  return (
    <>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-7987554086610229"
        data-ad-slot="5903461119"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({ });
      </script>
      </>
  );
};

export default AdBanner;
