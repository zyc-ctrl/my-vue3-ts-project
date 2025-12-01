// src/types/permission.ts
/** 角色类型（可扩展：admin/editor/guest 等） */
export type RoleType = 'admin' | 'editor' | 'guest';

/** 菜单项类型 */
export interface MenuItem {
  /** 菜单ID */
  id: string;
  /** 菜单名称 */
  title: string;
  /** 路由路径（对应 router 的 path） */
  path: string;
  /** 图标（可选） */
  icon?: string;
  /** 子菜单 */
  children?: MenuItem[];
  /** 所需角色（数组，支持多角色） */
  roles: RoleType[];
  /** 是否隐藏菜单（比如404页面） */
  hidden?: boolean;
}

/** 用户信息类型 */
export interface UserInfo {
  username: string;
  nickname: string;
  avatar: string;
  /** 当前用户角色 */
  role: RoleType;
  /** 登录令牌（前端模拟） */
  token: string;
}