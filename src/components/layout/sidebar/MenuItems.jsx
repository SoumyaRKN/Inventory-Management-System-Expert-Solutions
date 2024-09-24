import { uniqueId } from "lodash";
import { IconClipboardList } from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Inventory",
    icon: IconClipboardList,
    href: "/",
  },
];

export default Menuitems;