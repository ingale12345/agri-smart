import { MODES } from '@/types/common.types'

export const ROUTES = {
  AUTH: {
    LOGIN: '/',
  },
  HQ: {
    BASE: '/hq',
    RESTAURANT_GROUPS: {
      BASE: '/hq/restaurant-groups',
      MODE_PARAM: '/hq/restaurant-groups/:mode',
      NEW: `/hq/restaurant-groups/${MODES.NEW}`,
      VIEW: `/hq/restaurant-groups/${MODES.VIEW}`,
      EDIT: `/hq/restaurant-groups/${MODES.EDIT}`,
    },
    USERS: {
      BASE: '/hq/users',
      MODE_PARAM: '/hq/users/:mode',
      NEW: `/hq/users/${MODES.NEW}`,
      VIEW: `/hq/users/${MODES.VIEW}`,
      EDIT: `/hq/users/${MODES.EDIT}`,
      UPLOAD_HISTORY_USERS: '/hq/users/upload-history',
    },
    RESTAURANTS: {
      BASE: `/hq/restaurants`,
      MODE_PARAM: '/hq/restaurants/:mode',
      NEW: `/hq/restaurants/${MODES.NEW}`,
      VIEW: `/hq/restaurants/${MODES.VIEW}`,
      EDIT: `/hq/restaurants/${MODES.EDIT}`,
      UPLOAD_HISTORY_RESTAURANTS: '/hq/restaurants/upload-history',
      EMPLOYEE_ASSIGNMENTS: {
        MODE_PARAM: '/hq/restaurants/:mode/employee-assignments',
        NEW: `/hq/restaurants/${MODES.NEW}/employee-assignments`,
        VIEW: `/hq/restaurants/${MODES.VIEW}/employee-assignments`,
        EDIT: `/hq/restaurants/${MODES.EDIT}/employee-assignments`,
      },
      TABLE_LAYOUT: {
        MODE_PARAM: '/hq/restaurants/:mode/table-layout',
        NEW: `/hq/restaurants/${MODES.NEW}/table-layout`,
        VIEW: `/hq/restaurants/${MODES.VIEW}/table-layout`,
        EDIT: `/hq/restaurants/${MODES.EDIT}/table-layout`,
      },
      MENU_DETAILS: '/hq/restaurants/:mode/menu-details',
    },
    CENTRALISED_MENU: {
      BASE: '/hq/centralised-menu',
      MENU_STRUCTURE: {
        BASE: '/hq/centralised-menu/menu-structure',
        MODE_PARAM: '/hq/centralised-menu/menu-structure/:mode',
      },
      MODIFIER_MASTER: '/hq/centralised-menu/modifier-master',
      MODIFIER_GROUP: {
        BASE: '/hq/centralised-menu/modifier-master',
        MODE_PARAM: '/hq/centralised-menu/modifier-master/:mode',
        NEW: `/hq/centralised-menu/modifier-master/${MODES.NEW}`,
        VIEW: `/hq/centralised-menu/modifier-master/${MODES.VIEW}`,
        EDIT: `/hq/centralised-menu/modifier-master/${MODES.EDIT}`,
        ASSIGNMENTS: `/hq/centralised-menu/modifier-master/${MODES.EDIT}/modifier-item-assignments`,
      },
      ITEMS: {
        BASE: '/hq/centralised-menu/items',
        MODE_PARAM: '/hq/centralised-menu/items/:mode',
        NEW_ITEM: `/hq/centralised-menu/items/${MODES.NEW}`,
        VIEW_ITEM: `/hq/centralised-menu/items/${MODES.VIEW}`,
        EDIT_ITEM: `/hq/centralised-menu/items/${MODES.EDIT}`,
        UPLOAD_HISTORY_ITEMS: '/hq/centralised-menu/items/upload-history',
        EDIT_MODIFIER_GROUP_DETAILS: '/hq/centralised-menu/items/edit/modifier-group-assignments',
        VIEW_MODIFIER_GROUP_DETAILS: '/hq/centralised-menu/items/view/modifier-group-assignments',
      },
    },
    MENU_BUILDER: {
      BASE: '/hq/menus',
      MODE_PARAM: '/hq/menus/:mode',
      NEW: `/hq/menus/${MODES.NEW}`,
      VIEW: `/hq/menus/${MODES.VIEW}`,
      EDIT: `/hq/menus/${MODES.EDIT}`,
      ASSIGNMENTS: `/hq/menus/${MODES.EDIT}/menu-assignments`,
      COMBOS: `/hq/menus/${MODES.EDIT}/combos`,
      PUBLISH: `/hq/menus/${MODES.EDIT}/publish`,
      ASSIGN_RESTAURANT_GROUP: `/hq/menus/${MODES.EDIT}/restaurant-group-assignments`,
      VERSION_HISTORY: `/hq/centralised-menu/modifier-master/${MODES.VIEW}/version-history`,
      DISCOUNT_ASSIGNMENTS: {
        BASE: `/hq/menus/${MODES.EDIT}/discounts`,
        MODE_PARAM: `/hq/menus/${MODES.EDIT}/discounts/:discountMode`,
        NEW: `/hq/menus/${MODES.EDIT}/discounts/${MODES.NEW}`,
        VIEW: `/hq/menus/${MODES.EDIT}/discounts/${MODES.VIEW}`,
        EDIT: `/hq/menus/${MODES.EDIT}/discounts/${MODES.EDIT}`,
      },
      // combo assignment:
      COMBO_ASSIGNMENTS: {
        MODE_PARAM: `/hq/menus/${MODES.EDIT}/combos/:comboMode`,
        NEW: `/hq/menus/${MODES.EDIT}/combos/${MODES.NEW}`,
        VIEW: `/hq/menus/${MODES.EDIT}/combos/${MODES.VIEW}`,
        EDIT: `/hq/menus/${MODES.EDIT}/combos/${MODES.EDIT}`,
      },
      // promotion assignment:
      ASSIGN_PROMOTIONS: `/hq/menus/${MODES.EDIT}/promotions`,
      ASSIGN_PROMOTIONS_MODE: `/hq/menus/${MODES.EDIT}/promotions/:promotions-mode`,
      ASSIGN_PROMOTIONS_NEW: `/hq/menus/${MODES.EDIT}/promotions/${MODES.NEW}`,
      ASSIGN_PROMOTIONS_VIEW: `/hq/menus/${MODES.EDIT}/promotions/${MODES.VIEW}`,
      ASSIGN_PROMOTIONS_EDIT: `/hq/menus/${MODES.EDIT}/promotions/${MODES.EDIT}`,
    },
    DISCOUNTS: {
      BASE: '/hq/discounts',
      MODE_PARAM: '/hq/discounts/:mode',
      NEW: `/hq/discounts/${MODES.NEW}`,
      VIEW: `/hq/discounts/${MODES.VIEW}`,
      EDIT: `/hq/discounts/${MODES.EDIT}`,
    },
    TABLE_LAYOUT: {
      BASE: '/hq/table-layout',
      TEMPLATES: {
        BASE: '/hq/table-layout-templates',
        MODE_PARAM: '/hq/table-layout-templates/:mode',
        NEW: `/hq/table-layout-templates/${MODES.NEW}`,
        VIEW: `/hq/table-layout-templates/${MODES.VIEW}`,
        EDIT: `/hq/table-layout-templates/${MODES.EDIT}`,
        TEMPLATE_LAYOUT: `/hq/table-layout-templates/${MODES.EDIT}/template-layout`,
        DESIGNER: {
          MODE_PARAM: '/hq/table-layout-templates/:mode/designer',
          VIEW: `/hq/table-layout-templates/${MODES.VIEW}/designer`,
          EDIT: `/hq/table-layout-templates/${MODES.EDIT}/designer`,
        },
      },
      RESTAURANT_LAYOUT: {
        BASE: '/hq/table-layout/restaurant/:restaurantId',
        MODE_PARAM: '/hq/table-layout/restaurant/:restaurantId/:mode',
      },
    },
    PROMOTIONS: {
      BASE: '/hq/promotions',
      MODE_PARAM: '/hq/promotions/:mode',
      NEW: `/hq/promotions/${MODES.NEW}`,
      VIEW: `/hq/promotions/${MODES.VIEW}`,
      EDIT: `/hq/promotions/${MODES.EDIT}`,
    },
    REQUESTS: {
      BASE: '/hq/requests',
      DETAILS: '/hq/requests/:requestId',
    },
  },
  MANAGER: {
    BASE: '/manager',
    USERS: {
      BASE: '/manager/users',
      MODE_PARAM: '/manager/users/:mode',
      NEW: `/manager/users/${MODES.NEW}`,
      VIEW: `/manager/users/${MODES.VIEW}`,
      EDIT: `/manager/users/${MODES.EDIT}`,
      UPLOAD_HISTORY_USERS: '/manager/users/upload-history',
    },
    RESTAURANTS: {
      BASE: `/manager/restaurants`,
      MODE_PARAM: '/manager/restaurants/:mode',
      NEW: `/manager/restaurants/${MODES.NEW}`,
      VIEW: `/manager/restaurants/${MODES.VIEW}`,
      EDIT: `/manager/restaurants/${MODES.EDIT}`,
      EMPLOYEE_ASSIGNMENTS: {
        MODE_PARAM: '/manager/restaurants/:mode/employee-assignments',
        NEW: `/manager/restaurants/${MODES.NEW}/employee-assignments`,
        VIEW: `/manager/restaurants/${MODES.VIEW}/employee-assignments`,
        EDIT: `/manager/restaurants/${MODES.EDIT}/employee-assignments`,
      },
      TABLE_LAYOUT: {
        MODE_PARAM: '/manager/restaurants/:mode/table-layout',
        NEW: `/manager/restaurants/${MODES.NEW}/table-layout`,
        VIEW: `/manager/restaurants/${MODES.VIEW}/table-layout`,
        EDIT: `/manager/restaurants/${MODES.EDIT}/table-layout`,
      },
      MENU_DETAILS: '/manager/restaurants/:mode/menu-details',
      PRICE_OVERRIDE: {
        BASE: '/manager/restaurants/:mode/price-override',
        MODE_PARAM: '/manager/restaurants/:mode/price-override/:overrideMode',
        NEW: `/manager/restaurants/${MODES.EDIT}/price-override/${MODES.NEW}`,
        VIEW: `/manager/restaurants/${MODES.EDIT}/price-override/${MODES.VIEW}`,
        EDIT_OVERRIDE: `/manager/restaurants/${MODES.EDIT}/price-override/${MODES.EDIT}`,
      },
    },
    KITCHEN: {
      BASE: '/manager/kds',
      MODE_PARAM: '/manager/kds/:mode',
      NEW: `/manager/kds/${MODES.NEW}`,
      VIEW: `/manager/kds/${MODES.VIEW}`,
      EDIT: `/manager/kds/${MODES.EDIT}`,
    },
    MENU_BUILDER: {
      BASE: '/manager/menus',
      MODE_PARAM: '/manager/menus/:mode',
      NEW: `/manager/menus/${MODES.NEW}`,
      VIEW: `/manager/menus/${MODES.VIEW}`,
      EDIT: `/manager/menus/${MODES.EDIT}`,
    },
    REQUESTS: {
      BASE: '/manager/requests',
      DETAILS: '/manager/requests/:requestId',
    },
  },
  CUSTOMER: {
    BASE: '/customer',
    SESSION_EXPIRED: '/customer/session-expired',
    RESTAURANT: {
      BASE: 'r/:restaurantId/:tableId',
      BASE_WITH_SESSION: 'r/:restaurantId/:tableId/:sessionId',
      MENU: {
        CATEGORY: ':orderType/:category',
        ITEM: 'r/:restaurantId/:tableId/:sessionId/:orderType/:category/:itemId/:mode',
        COMBO: 'r/:restaurantId/:tableId/:sessionId/:orderType/combos/:comboId/:mode',
      },
      PROMOTION: {
        BASE: 'r/:restaurantId/:tableId/:sessionId/:orderType/promotion/:promotionId',
        SELECT_ITEM:
          'r/:restaurantId/:tableId/:sessionId/:orderType/select-category-item/:category',
      },
      ORDER: {
        DETAILS: 'r/:restaurantId/:tableId/:sessionId/:orderType/order-details',
        PLACED: 'r/:restaurantId/:tableId/:sessionId/:orderType/order-placed',
        MY_ORDERS: 'r/:restaurantId/:tableId/:sessionId/:orderType/my-orders',
        RECEIPT: 'r/:restaurantId/:tableId/:sessionId/:orderType/receipt/:orderId',
        CASH_PAYMENT: 'r/:restaurantId/:tableId/:sessionId/:orderType/cash-payment',
      },
    },
  },
  UNAUTHORIZED: '/unauthorized',
} as const

export type RoutePaths =
  | typeof ROUTES.HQ.RESTAURANT_GROUPS.BASE
  | typeof ROUTES.HQ.RESTAURANT_GROUPS.MODE_PARAM
  | typeof ROUTES.HQ.RESTAURANT_GROUPS.NEW
  | typeof ROUTES.HQ.RESTAURANT_GROUPS.VIEW
  | typeof ROUTES.HQ.RESTAURANT_GROUPS.EDIT
  | typeof ROUTES.HQ.RESTAURANTS.BASE
  | typeof ROUTES.HQ.RESTAURANTS.MODE_PARAM
  | typeof ROUTES.HQ.RESTAURANTS.NEW
  | typeof ROUTES.HQ.RESTAURANTS.VIEW
  | typeof ROUTES.HQ.RESTAURANTS.EDIT
  | typeof ROUTES.HQ.RESTAURANTS.EMPLOYEE_ASSIGNMENTS.MODE_PARAM
  | typeof ROUTES.HQ.RESTAURANTS.EMPLOYEE_ASSIGNMENTS.NEW
  | typeof ROUTES.HQ.RESTAURANTS.EMPLOYEE_ASSIGNMENTS.VIEW
  | typeof ROUTES.HQ.RESTAURANTS.EMPLOYEE_ASSIGNMENTS.EDIT
  | typeof ROUTES.HQ.RESTAURANTS.TABLE_LAYOUT.MODE_PARAM
  | typeof ROUTES.HQ.RESTAURANTS.TABLE_LAYOUT.NEW
  | typeof ROUTES.HQ.RESTAURANTS.TABLE_LAYOUT.VIEW
  | typeof ROUTES.HQ.RESTAURANTS.TABLE_LAYOUT.EDIT
  | typeof ROUTES.HQ.RESTAURANTS.UPLOAD_HISTORY_RESTAURANTS
  | typeof ROUTES.HQ.USERS.BASE
  | typeof ROUTES.HQ.USERS.MODE_PARAM
  | typeof ROUTES.HQ.USERS.NEW
  | typeof ROUTES.HQ.USERS.VIEW
  | typeof ROUTES.HQ.USERS.EDIT
  | typeof ROUTES.HQ.USERS.UPLOAD_HISTORY_USERS
  | typeof ROUTES.HQ.CENTRALISED_MENU.MENU_STRUCTURE.BASE
  | typeof ROUTES.HQ.CENTRALISED_MENU.MENU_STRUCTURE.MODE_PARAM
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_MASTER
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_GROUP.BASE
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_GROUP.NEW
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_GROUP.VIEW
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_GROUP.EDIT
  | typeof ROUTES.HQ.CENTRALISED_MENU.MODIFIER_GROUP.ASSIGNMENTS
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.BASE
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.MODE_PARAM
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.NEW_ITEM
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.VIEW_ITEM
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.EDIT_ITEM
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.EDIT_MODIFIER_GROUP_DETAILS
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.VIEW_MODIFIER_GROUP_DETAILS
  | typeof ROUTES.HQ.CENTRALISED_MENU.ITEMS.UPLOAD_HISTORY_ITEMS
  | typeof ROUTES.HQ.MENU_BUILDER.BASE
  | typeof ROUTES.HQ.MENU_BUILDER.MODE_PARAM
  | typeof ROUTES.HQ.MENU_BUILDER.NEW
  | typeof ROUTES.HQ.MENU_BUILDER.VIEW
  | typeof ROUTES.HQ.MENU_BUILDER.EDIT
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGNMENTS
  | typeof ROUTES.HQ.MENU_BUILDER.COMBOS
  | typeof ROUTES.HQ.MENU_BUILDER.PUBLISH
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_RESTAURANT_GROUP
  | typeof ROUTES.HQ.MENU_BUILDER.VERSION_HISTORY
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_PROMOTIONS
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_PROMOTIONS_MODE
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_PROMOTIONS_NEW
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_PROMOTIONS_VIEW
  | typeof ROUTES.HQ.MENU_BUILDER.ASSIGN_PROMOTIONS_EDIT
  | typeof ROUTES.HQ.PROMOTIONS.BASE
  | typeof ROUTES.HQ.PROMOTIONS.MODE_PARAM
  | typeof ROUTES.HQ.PROMOTIONS.NEW
  | typeof ROUTES.HQ.PROMOTIONS.VIEW
  | typeof ROUTES.HQ.PROMOTIONS.EDIT
  | typeof ROUTES.HQ.TABLE_LAYOUT.BASE
  | typeof ROUTES.CUSTOMER.RESTAURANT.BASE
  | typeof ROUTES.CUSTOMER.RESTAURANT.MENU.CATEGORY
  | typeof ROUTES.CUSTOMER.RESTAURANT.MENU.ITEM
  | typeof ROUTES.CUSTOMER.RESTAURANT.PROMOTION.BASE
  | typeof ROUTES.CUSTOMER.RESTAURANT.PROMOTION.SELECT_ITEM
  | typeof ROUTES.CUSTOMER.RESTAURANT.ORDER.DETAILS
  | typeof ROUTES.CUSTOMER.RESTAURANT.ORDER.CASH_PAYMENT
