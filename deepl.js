module.exports = (RED) => {
  "use strict";

  const axiosBase = require("axios");
  const Mustache = require("mustache");

  const DeeplNode = function (config) {
    const node = this;
    RED.nodes.createNode(node, config);

    let output = config.output;

    const AUTH_KEY = config.auth_key;
    const TEXT = config.text;
    const TARGET_LANG = config.target_lang;
    const axios = axiosBase.create({
      baseURL: `https://api-free.deepl.com/v2/translate`,
      // params: {
      //   auth_key: $AUTH_KEY,
      //   text: $TEXT,
      //   target_lang: $TARGET_LANG
      // },
    });

    const handleEvent = async (event, msg) => {
      let AUTH_KEY = Mustache.render(config.auth_key, msg);
      let TEXT = Mustache.render(config.text, msg);
      let TARGET_LANG = Mustache.render(config.target_lang, msg);

      console.log("AUTH_KEY: ", AUTH_KEY);
      console.log("TEXT: ", TEXT);
      console.log("TARGET_LANG: ", TARGET_LANG);
      let data = {
        AUTH_KEY: $AUTH_KEY,
        TEXT: $TEXT,
        TARGET_LANG: $TARGET_LANG,
      };

      return data;

      // let targetMessageId = Mustache.render(config.MessageId, msg);

      // if (targetMessageId.length == 0) {
      //   targetMessageId = event.message.id;
      // }

      // try {
      //   const res = await axios.get(`/${targetMessageId}/content`, {
      //     responseType: "arraybuffer",
      //   });

      //   if (output === "binary") {
      //     return Promise.resolve(Buffer.from(res.data));
      //   } else {
      //     return Promise.resolve(Buffer.from(res.data).toString("base64"));
      //   }
      // } catch (error) {
      //   console.log(error);
      //   return Promise.resolve(null);
      // }
    };

    node.on("input", async (msg) => {
      console.log("AUTH_KEY: ", AUTH_KEY);
      console.log("TEXT: ", TEXT);
      console.log("TARGET_LANG: ", TARGET_LANG);
      let data = {
        AUTH_KEY: $AUTH_KEY,
        TEXT: $TEXT,
        TARGET_LANG: $TARGET_LANG,
      };
      msg.payload = { "id":1, "data": data }
      node.send(msg);
      // msg.payload = handleEvent

    });
  };

  RED.nodes.registerType("deepl", DeeplNode);
};
