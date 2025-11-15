import googlePay from '@/assets/images/google.png'
import applePay from '@/assets/images/apple.png'
import card from '@/assets/images/card.png'
import type { PaymentMethod } from '@/types/configuration.types'

export const defaultPaymentMethods: PaymentMethod[] = [
  {
    type: 'GOOGLE_PAY',
    translations: [
      {
        languageCode: 'en',
        name: 'Google Pay',
      },
      {
        languageCode: 'th',
        name: 'Google Pay TH',
      },
      {
        languageCode: 'ja',
        name: 'Google Pay JA',
      },
    ],
    logoUrl: googlePay,
  },
  {
    type: 'CASH',
    translations: [
      {
        languageCode: 'en',
        name: 'Cash',
      },
      {
        languageCode: 'th',
        name: 'Cash TH',
      },
      {
        languageCode: 'ja',
        name: 'Cash JA',
      },
    ],
    logoUrl: card,
  },

  {
    type: 'APPLE_PAY',
    translations: [
      {
        languageCode: 'en',
        name: 'Apple Pay',
      },
      {
        languageCode: 'th',
        name: 'Apple Pay TH',
      },
      {
        languageCode: 'ja',
        name: 'Apple Pay JA',
      },
    ],
    logoUrl: applePay,
  },
  {
    type: 'CARD',
    translations: [
      {
        languageCode: 'en',
        name: 'Card',
      },
      {
        languageCode: 'th',
        name: 'Card TH',
      },
      {
        languageCode: 'ja',
        name: 'Card JA',
      },
    ],
    logoUrl: card,
  },
]
