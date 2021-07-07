module.exports = (RED) => {
  "use strict";
  const axios = require('axios');

  const DeeplNode = function (config) {
    const node = this;
    RED.nodes.createNode(node, config);


    const AUTH_KEY = config.auth_key;
    const SOURCE_LANG = config.source_lang
    const TEXT = config.text;
    const TARGET_LANG = config.target_lang;

    node.on("input", async (msg) => {
      const res = await axios.get(`https://api-free.deepl.com/v2/translate`, {
        params: {
          "auth_key": AUTH_KEY,
          "source_lang": SOURCE_LANG,
          "text": TEXT,
          "target_lang": TARGET_LANG
        }
      });
      msg.payload = res.data;
      node.send(msg);
    });

  };

  RED.nodes.registerType("deepl", DeeplNode);
};
