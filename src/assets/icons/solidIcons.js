import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faSpinner,
  faXmark,
  faCaretLeft,
  faCaretRight,
  faImage,
  faHandSpock,
  faHand,
} from "@fortawesome/free-solid-svg-icons";

const solidIcons = () => {
  return library.add(
    faSpinner,
    faXmark,
    faCaretLeft,
    faCaretRight,
    faImage,
    faHandSpock,
    faHand
  );
};

export default solidIcons;
