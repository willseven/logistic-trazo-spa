import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";


export function CardHover() {
  const router = useRouter();
    const { roles, setCurrentRole, setMenuList } = useUserStore((state) => ({
        roles: state.roles,
        setCurrentRole: state.setCurrentRole,
        setMenuList: state.setMenuList,
      }));
      // console.log(roles)
  return (
    <div className="flex flex-col">
    <div className="max-w-5xl mx-auto px-9">
      <HoverEffect roles={projects} />
    </div>
    <div className="flex justify-center md:mt-40 z-30">
      <Button className="text-3xl p-10 rounded-full" onClick={()=>{router.push("/dashboard/manage-users")}}>
        Ir a la Página Principal
      </Button>
    </div>
    </div>
  );
}
export const projects = [
  {
    title: "Marítimo",
    description:"A technology company that builds economic infrastructure for the internet.",
    link: "/images/noxun.jpg",
    image: "FaPlaneDeparture",
    
             
  },
  {
    title: "Terrestre",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "/images/noxun.jpg",
    image: "IoIosBoat",
  },
  {
    title: "Seguros",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "/images/noxun.jpg",
    image: "FaTruck ",
  },
  {
    title: "Multimodal",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "/images/noxun.jpg",
    image: "FaBoxesPacking",
  },
  
];
    