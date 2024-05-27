'use client'

import PageUi from "@/components/page/pageui";
import ViewAllPlayListsPage from "@/components/page/viewAllPlayListsPage";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {


  }, [])

  return (
    <PageUi>
     
         <head>
        <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MM3KNZ8Q');</script>
<!-- End Google Tag Manager -->
      </head>
    <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MM3KNZ8Q"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
      <ViewAllPlayListsPage />
    </PageUi>

  );
}
