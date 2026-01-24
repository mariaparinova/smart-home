import { Card, CardType, Sensor } from '../../../shared/models/dashboard.models';
import { generateCardId } from '../../dashboard-store/dashboard-store.utils';

const getSensorItems = (amountOfDevices: number): Sensor[] => {
  return Array.from({ length: amountOfDevices }, () => {
    return {
      type: 'sensor',
      label: 'weather',
      icon: 'cloud',
      value: {
        amount: 1,
        unit: 'clear',
      },
      id: generateCardId(),
    };
  });
};

export const CARDS_EXAMPLE: Card<Sensor>[] = [
  {
    id: 'card_1',
    title: 'Horizontal Layout',
    layout: CardType.Horizontal,
    items: getSensorItems(3),
  },
  {
    id: 'card_2',
    title: 'Vertical Layout',
    layout: CardType.Vertical,
    items: getSensorItems(3),
  },
  {
    id: 'card_3',
    title: 'Single card',
    layout: CardType.SingleDevice,
    items: getSensorItems(1),
  },
];
