import Brands from "@/src/components/home/brands";
import Experience from "@/src/components/home/experience";
import Services from "@/src/components/home/services";
import Welcome from "@/src/components/home/welcome";

export default function Home() {
  return (<>
    <Welcome/>
    <Brands/>
    <Services/>
    <Experience/>
    </>
  );
}
