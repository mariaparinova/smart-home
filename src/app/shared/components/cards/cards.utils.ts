import { CardType } from '../../models/dashboard.models';

export function getCardInfo(layout: CardType) {
  switch (layout) {
    case CardType.Horizontal: {
      return 'This card type only supports sensors';
    }
    case CardType.Vertical: {
      return 'This card type supports sensors and devices';
    }
    case CardType.SingleDevice: {
      return 'This card type supports sensors and devices';
    }
  }
}
