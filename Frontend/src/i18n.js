import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import zh from "./translations/zh.json";
import hi from "./translations/hi.json";
import es from "./translations/es.json";
import fr from "./translations/fr.json";
import ar from "./translations/ar.json";
import bn from "./translations/bn.json";
import pt from "./translations/pt.json";
import ru from "./translations/ru.json";
import ur from "./translations/ur.json";
import id from "./translations/id.json";
import de from "./translations/de.json";
import ja from "./translations/ja.json";
import ta from "./translations/ta.json";
import te from "./translations/te.json";
import mr from "./translations/mr.json";
import tr from "./translations/tr.json";
import ko from "./translations/ko.json";
import vi from "./translations/vi.json";
import it from "./translations/it.json";
import gu from "./translations/gu.json";
import kn from "./translations/kn.json";
import ml from "./translations/ml.json";
import pa from "./translations/pa.json";
import th from "./translations/th.json";
import fa from "./translations/fa.json";
import nl from "./translations/nl.json";
import ms from "./translations/ms.json";
import tl from "./translations/tl.json";
import he from "./translations/he.json";
import pl from "./translations/pl.json";
import uk from "./translations/uk.json";
import cs from "./translations/cs.json";
import sk from "./translations/sk.json";
import hu from "./translations/hu.json";
import ro from "./translations/ro.json";
import bg from "./translations/bg.json";
import el from "./translations/el.json";
import sv from "./translations/sv.json";
import no from "./translations/no.json";
import da from "./translations/da.json";
import fi from "./translations/fi.json";
import is from "./translations/is.json";
import et from "./translations/et.json";
import lv from "./translations/lv.json";
import lt from "./translations/lt.json";
import hr from "./translations/hr.json";
import sr from "./translations/sr.json";
import sl from "./translations/sl.json";
import bs from "./translations/bs.json";
import mk from "./translations/mk.json";
import sq from "./translations/sq.json";
import af from "./translations/af.json";
import sw from "./translations/sw.json";
import am from "./translations/am.json";
import ha from "./translations/ha.json";
import yo from "./translations/yo.json";
import ig from "./translations/ig.json";
import zu from "./translations/zu.json";
import xh from "./translations/xh.json";
import so from "./translations/so.json";
import om from "./translations/om.json";
import rw from "./translations/rw.json";
import ny from "./translations/ny.json";
import sn from "./translations/sn.json";
import st from "./translations/st.json";
import mg from "./translations/mg.json";
import ka from "./translations/ka.json";
import hy from "./translations/hy.json";
import az from "./translations/az.json";
import kk from "./translations/kk.json";
import uz from "./translations/uz.json";
import tg from "./translations/tg.json";
import ky from "./translations/ky.json";
import tk from "./translations/tk.json";
import mn from "./translations/mn.json";
import ne from "./translations/ne.json";
import si from "./translations/si.json";
import my from "./translations/my.json";
import km from "./translations/km.json";
import lo from "./translations/lo.json";
import ps from "./translations/ps.json";
import ku from "./translations/ku.json";
import sd from "./translations/sd.json";
import gl from "./translations/gl.json";
import ca from "./translations/ca.json";
import eu from "./translations/eu.json";
import cy from "./translations/cy.json";
import ga from "./translations/ga.json";
import gd from "./translations/gd.json";
import mt from "./translations/mt.json";
import lb from "./translations/lb.json";
import fo from "./translations/fo.json";
import haw from "./translations/haw.json";
import mi from "./translations/mi.json";
import sm from "./translations/sm.json";
import to from "./translations/to.json";
import fj from "./translations/fj.json";
import qu from "./translations/qu.json";
import gn from "./translations/gn.json";
import ay from "./translations/ay.json";
import ht from "./translations/ht.json";
import jv from "./translations/jv.json";
import su from "./translations/su.json";
import ceb from "./translations/ceb.json";
import co from "./translations/co.json";
import eo from "./translations/eo.json";
import la from "./translations/la.json";
import yi from "./translations/yi.json";

const savedLanguage =
  localStorage.getItem("shopnow-language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      hi: { translation: hi },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
      bn: { translation: bn },
      pt: { translation: pt },
      ru: { translation: ru },
      ur: { translation: ur },
      id: { translation: id },
      de: { translation: de },
      ja: { translation: ja },
      ta: { translation: ta },
      te: { translation: te },
      mr: { translation: mr },
      tr: { translation: tr },
      ko: { translation: ko },
      vi: { translation: vi },
      it: { translation: it },
      gu: { translation: gu },
      kn: { translation: kn},
      ml: { translation: ml },
      pa: { translation: pa },
      th: { translation: th },
      fa: { translation: fa },
      nl: { translation: nl },
      ms: { translation: ms },
      tl: { translation: tl },
      he: { translation: he },
      pl: { translation: pl },
      uk: { translation: uk },
      cs: { translation: cs },
      sk: { translation: sk },
      hu: { translation: hu },
      ro: { translation: ro },
      bg: { translation: bg },
      el: { translation: el },
      sv: { translation: sv },
      no: { translation: no },
      da: { translation: da },
      fi: { translation: fi },
      is: { translation: is },
      et: { translation: et },
      lv: { translation: lv },
      lt: { translation: lt },
      hr: { translation: hr },
      sr: { translation: sr },
      sl: { translation: sl },
      bs: { translation: bs },
      mk: { translation: mk },
      sq: { translation: sq },
      af: { translation: af },
      sw: { translation: sw },
      am: { translation: am },
      ha: { translation: ha },
      yo: { translation: yo },
      ig: { translation: ig },
      zu: { translation: zu },
      xh: { translation: xh },
      so: { translation: so },
      om: { translation: om },
      rw: { translation: rw },
      ny: { translation: ny },
      sn: { translation: sn },
      st: { translation: st },
      mg: { translation: mg },
      ka: { translation: ka },
      hy: { translation: hy },
      az: { translation: az },
      kk: { translation: kk },
      uz: { translation: uz },
      tg: { translation: tg },
      ky: { translation: ky },
      tk: { translation: tk },
      mn: { translation: mn },
      ne: { translation: ne },
      si: { translation: si },
      my: { translation: my },
      km: { translation: km },
      lo: { translation: lo },
      ps: { translation: ps },
      ku: { translation: ku },
      sd: { translation: sd },
      gl: { translation: gl },
      ca: { translation: ca },
      eu: { translation: eu },
      cy: { translation: cy },
      ga: { translation: ga },
      gd: { translation: gd },
      mt: { translation: mt },
      lb: { translation: lb },
      fo: { translation: fo },
      haw: { translation: haw },
      mi: { translation: mi },
      sm: { translation: sm },
      to: { translation: to },
      fj: { translation: fj },
      qu: { translation: qu },
      gn: { translation: gn },
      ay: { translation: ay },
      ht: { translation: ht },
      jv: { translation: jv },
      su: { translation: su },
      ceb: { translation: ceb },
      co: { translation: co },
      eo: { translation: eo },
      la: { translation: la },
      yi: { translation: yi },
      

    },

    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;