import { Howl } from "howler";
import BannaReBaga from "./audioclips/BannaRe.mp3";
import HealingRagas from "./audioclips/Healing Ragas.mp3";

let BannaReSound = new Howl({
  src: BannaReBaga,
  loop: false,
  autoplay: false,
  volume: 0.3,
});

let HealingRagasSound = new Howl({
  src: HealingRagas,
  loop: false,
  autoplay: false,
  volume: 0.3,
});

const audioclips = [
  {
    id: 1,
    sound: BannaReSound,
    label: "BannaRe",
    category: "Instrumental",
    requestCount: 0,
  },
  {
    id: 2,
    sound: HealingRagasSound,
    label: "Healing Ragas",
    category: "Meditation",
    requestCount: 0,
  },
  {
    id: 3,
    sound: "",
    label: "BannaRe2",
    category: "Instrumental",
    requestCount: 0,
  },
  {
    id: 4,
    sound: "",
    label: "Healing Ragas2",
    category: "Meditation",
    requestCount: 0,
  },
  {
    id: 5,
    sound: "",
    label: "Healing Ragas3",
    category: "Romantic",
    requestCount: 0,
  },
  {
    id: 6,
    sound: "",
    label: "Healing Ragas4",
    category: "Dance",
    requestCount: 0,
  },
];

export default audioclips;
