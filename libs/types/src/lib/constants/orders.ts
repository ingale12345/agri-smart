import type { TFunction } from 'i18next'

export const ORDER_CONFIRM_TEXTS = (t: TFunction, isUpdating: boolean, totalAmount: string) => ({
  title: isUpdating
    ? t('order_details.confirm_update_title')
    : t('order_details.confirm_order_title'),
  description: isUpdating
    ? t('order_details.confirm_update_description', { totalAmount })
    : t('order_details.confirm_order_description', { totalAmount }),
  continueButtonText: isUpdating
    ? t('order_details.update_order')
    : t('order_details.confirm_order'),
  cancelButtonText: t('order_details.cancel'),
})

export const ORDER_BUTTON_TEXTS = (t: TFunction, isUpdating: boolean, isLoading: boolean) => {
  if (isLoading) {
    return isUpdating ? t('order_details.updating_order') : t('order_details.placing_order')
  }
  return isUpdating ? t('order_details.update_order') : t('order_details.place_order')
}
