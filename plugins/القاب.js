import _0x428f93 from "mongoose";
const uri = "mongodb+srv://itachi3mk:mypassis1199@cluster0.zzyxjo3.mongodb.net/?retryWrites=true&w=majority";
_0x428f93.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(_0x46bc2f => console.error("Error connecting to MongoDB:", _0x46bc2f));
const bk9Schema = new _0x428f93.Schema({
  groupId: String,
  userId: String,
  bk9: String
});
const BK9 = _0x428f93.model("BK9", bk9Schema);
let handler = async function (_0x2937c8, {
  conn: _0x3407a1,
  text: _0x42cb88,
  command: _0x1ac1d4,
  isAdmin: _0x2b2ca3
}) {
  try {
    if (_0x1ac1d4 === "الألقاب") {
      if (!_0x2937c8.isGroup) {
        _0x2937c8.reply("هذا الأمر يعمل فقط في المجموعات");
        return;
      }
      if (!_0x2b2ca3) {
        _0x2937c8.reply("هذا الأمر يعمل فقط مع الإداريين");
        return;
      }
      const _0x44f6aa = await BK9.find({
        groupId: _0x2937c8.chat
      });
      if (_0x44f6aa.length === 0) {
        _0x2937c8.reply(" لا يـوجـد ألـقـاب مـسـجـلـة حـالـيـا ┇");
      } else {
        let _0x571f14 = "";
        _0x44f6aa.forEach((_0x1d5ccf, _0x381009) => {
          _0x571f14 += _0x381009 + 1 + " - " + _0x1d5ccf.bk9 + "\n";
        });
        _0x2937c8.reply("┇عـدد الألقـاب المـسـجـلـة: " + _0x44f6aa.length + "\n\n ┇الألقـاب المـسـجـلـة:\n\n" + _0x571f14);
      }
    } else if (_0x1ac1d4 === "تسجيل") {
      if (!_0x2937c8.isGroup) {
        _0x2937c8.reply("هذا الأمر يعمل فقط في المجموعات");
        return;
      }
      if (!_0x2b2ca3) {
        _0x2937c8.reply("هذا الأمر يعمل فقط مع الإداريين");
        return;
      }
      if (!_0x2937c8.mentionedJid || !_0x42cb88 || _0x42cb88.trim() === "") {
        _0x2937c8.reply("مثال:\n .تسجيل @العضو جيرايا");
        return;
      }
      const _0x29b1fb = _0x2937c8.mentionedJid[0].replace("@s.whatsapp.net", "");
      const _0xd54b9e = _0x42cb88.trim().split(" ").slice(1).filter(_0x413500 => _0x413500.trim() !== "");
      const _0x4d48ec = _0xd54b9e.join(" ");
      if (!/\S/.test(_0x4d48ec)) {
        _0x2937c8.reply("مثال:\n .تسجيل @العضو جيرايا");
        return;
      }
      const _0x53f1f3 = await BK9.findOne({
        bk9: _0x4d48ec,
        groupId: _0x2937c8.chat
      });
      if (_0x53f1f3) {
        const _0x4f3847 = await _0x3407a1.getName(_0x53f1f3.userId + "@s.whatsapp.net");
        _0x2937c8.reply("┇ اللقب " + _0x4d48ec + " ماخوذ من طرف @" + _0x4f3847);
      } else {
        await BK9.findOneAndUpdate({
          userId: _0x29b1fb,
          groupId: _0x2937c8.chat
        }, {
          bk9: _0x4d48ec
        }, {
          upsert: true
        });
        _0x2937c8.reply("┇ تم تسجيله بلقب " + _0x4d48ec + " بنجاح ");
      }
    } else if (_0x1ac1d4 === "حذف_لقب") {
      if (!_0x2937c8.isGroup) {
        _0x2937c8.reply("هذا الأمر يعمل فقط في المجموعات");
        return;
      }
      if (!_0x2b2ca3) {
        _0x2937c8.reply("هذا الأمر يعمل فقط مع الإداريين");
        return;
      }
      if (!_0x42cb88 || _0x42cb88.trim() === "") {
        _0x2937c8.reply("اكتب اللقب الذي تريد حذفه");
        return;
      }
      const _0x414234 = _0x42cb88.trim();
      const _0xda9359 = await BK9.deleteOne({
        bk9: _0x414234,
        groupId: _0x2937c8.chat
      });
      if (_0xda9359.deletedCount > 0) {
        _0x2937c8.reply("┇ تم حذف اللقب " + _0x414234 + " بنجاح");
      } else {
        _0x2937c8.reply(" اللقب " + _0x414234 + " غير مسجل لاحد اساسا");
      }
    } else if (_0x1ac1d4 === "لقبي") {
      try {
        const _0x4967b1 = _0x2937c8.sender.split("@")[0];
        const _0x3a7317 = await BK9.findOne({
          userId: _0x4967b1,
          groupId: _0x2937c8.chat
        });
        if (_0x3a7317 && _0x3a7317.bk9) {
          _0x2937c8.reply("┇ لقبك هو : " + _0x3a7317.bk9);
        } else {
          _0x2937c8.reply("┇ لم يتم تسجيلك بعد");
        }
      } catch (_0x203760) {
        console.error("Error fetching user's nickname:", _0x203760);
        _0x2937c8.reply("حدث خطأ أثناء جلب لقبك");
      }
    } else if (_0x1ac1d4 === "لقبه" && _0x2937c8.mentionedJid) {
      if (!_0x2937c8.mentionedJid || _0x2937c8.mentionedJid.length === 0) {
        _0x2937c8.reply("منشن احد");
        return;
      }
      const _0x32a957 = _0x2937c8.mentionedJid[0].replace("@s.whatsapp.net", "");
      const _0x39f918 = await BK9.findOne({
        userId: _0x32a957,
        groupId: _0x2937c8.chat
      });
      if (_0x39f918) {
        const _0x20a473 = await _0x3407a1.getName(_0x32a957 + "@s.whatsapp.net");
        _0x2937c8.reply("┇ لقبه هو : " + _0x39f918.bk9);
      } else {
        _0x2937c8.reply("┇ لم يتم تسجيله بعد");
      }
    } else if (_0x1ac1d4 === "لقب") {
      if (!_0x42cb88 || _0x42cb88.trim() === "") {
        _0x2937c8.reply("اكتب لقب للتحقق منه");
        return;
      }
      const _0xdc60ae = _0x42cb88.trim();
      const _0x2bbc47 = await BK9.findOne({
        bk9: _0xdc60ae,
        groupId: _0x2937c8.chat
      });
      if (_0x2bbc47) {
        const _0x4ccfe0 = await _0x3407a1.getName(_0x2bbc47.userId.split("@")[0]);
        _0x2937c8.reply("┇ اللقب " + _0xdc60ae + " ماخوذ من طرف " + _0x4ccfe0);
      } else {
        _0x2937c8.reply("┇ اللقب " + _0xdc60ae + " متوفر");
      }
    } else {}
  } catch (_0x2dd35e) {
    console.error("خطأ", _0x2dd35e);
  }
};
handler.command = ["الألقاب", "تسجيل", "لقبي", "لقبه", "حذف_لقب", "لقب"];
handler.tags = ["BK9"];
export default handler;
