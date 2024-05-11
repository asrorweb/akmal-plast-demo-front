import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Ummumiy summa",
    value: "2 300 000 sum",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "o'tgan haftaga nisbatan",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Bugungi klentlar",
    value: "23",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "o'tgan oyga nisbatan",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Yangi klentlar",
    value: "36",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "Kechaga nisbatan",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Bugungi sotuv",
    value: "1 250 000 sum",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "kechaga nisbatan",
    },
  },
];

export default statisticsCardsData;
