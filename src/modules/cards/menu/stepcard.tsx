import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useUserStore } from "@/lib/store";


export function CardHover() {
    const { roles, setCurrentRole, setMenuList } = useUserStore((state) => ({
        roles: state.roles,
        setCurrentRole: state.setCurrentRole,
        setMenuList: state.setMenuList,
      }));
      // console.log(roles)
  return (
    <div className="max-w-5xl mx-auto px-9">
      <HoverEffect roles={roles} />
    </div>
  );
}

    