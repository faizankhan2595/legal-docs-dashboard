import {
  DashboardOutlined,
  AuditOutlined,
  UserOutlined,
  ProfileOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/home`,
    title: "Dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Apostille of Documents",
    path: `${APP_PREFIX_PATH}/document`,
    title: "Apostille of Documents",
    icon: AuditOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Your Transactions",
    path: `${APP_PREFIX_PATH}/transactions`,
    title: "Your Transactions",
    icon: WalletOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Your Profile",
    path: `${APP_PREFIX_PATH}/profile`,
    title: "Your Profile",
    icon: ProfileOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const dashBoardNavTreeAdmin = [
  {
    key: "dashboard",
    path: `/admin/home`,
    title: "Dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Apostille of Documents",
    path: `/admin/document`,
    title: "Apostille of Documents",
    icon: AuditOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Users",
    path: `/admin/users`,
    title: "Users",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "Your Profile",
    path: `/admin/profile`,
    title: "Your Profile",
    icon: ProfileOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

let navigationConfig = null;
const role = localStorage.getItem("role");

if (role && +role === 0) navigationConfig = [...dashBoardNavTreeAdmin];
else navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
