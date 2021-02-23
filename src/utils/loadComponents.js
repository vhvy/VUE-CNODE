import Vue from "vue";
import "muse-ui/lib/styles/base.less";
import 'muse-ui/lib/styles/theme.less';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import {
    Button,
    BottomNav,
    Icon,
    Form,
    TextField,
    Helpers,
    Progress,
    Snackbar,
    LoadMore,
    AppBar,
    Dialog,
    BottomSheet,
    List,
    SubHeader,
    Select,

} from "muse-ui";
import Toast from "muse-ui-toast";
import Loading from "muse-ui-loading";
import Message from "muse-ui-message";

const components = [
    Button,
    BottomNav,
    Icon,
    Form,
    TextField,
    Toast,
    Loading,
    Helpers,
    Progress,
    Snackbar,
    LoadMore,
    AppBar,
    Message,
    Dialog,
    BottomSheet,
    List,
    SubHeader,
    Select
];

components.map(c => Vue.use(c));