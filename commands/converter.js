const {
    cmd,
    sendPhoto,
    sendVoice,
    sendGif,
    sendBassAudio,
    sendSlowAudio,
    sendBlownAudio,
    sendDeepAudio,
    sendErrapeAudio,
    sendFastAudio,
    sendFatAudio,
    sendNightcoreAudio,
    sendReverseAudio,
    sendSquirrelAudio,
    toAudio,
    toPTT,
    toVideo,
    AudioMetaData,
    lang,
    config
} = require('../lib');

cmd({
    pattern: 'photo',
    desc: lang.CONVERTER.PHOTO_DESC,
    type: "converter"
}, async (message) => {
    if (!message.reply_message.stickerMessage) return  await message.reply(lang.BASE.NEED.format("non animated sticker message"));
    if(message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to a non animated sticker"));
    return await sendPhoto(message);
});
cmd({
    pattern: 'mp4',
    desc: lang.CONVERTER.VIDEO_DESC,
    type: "converter"
}, async (message, match) => {
    if (!message.reply_message.sticker) return message.reply(lang.BASE.NEED.format("animated sticker message"));
    if(!message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to an animated sticker"));
    let media = await toVideo(await message.reply_message.download())
    return await message.client.sendMessage(message.from, {
        video: media,
        mimetype: 'video/mp4',
    }, {
        quoted: message.reply_message.data
    })
});
cmd({
    pattern: 'voice',
    desc: lang.CONVERTER.AUDIO_DESC,
    type: "converter"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("video/audio message"));
    let media = await toPTT(await message.reply_message.download())
    return await message.client.sendMessage(message.from, {
        audio: media,
        mimetype: 'audio/mpeg',
        ptt: true
    }, {
        quoted: message
    })
});
cmd({
    pattern: 'gif',
    desc: lang.CONVERTER.GIF_DESC,
    type: "converter"
}, async (message) => {
    if (!message.reply_message) return;
    if (!message.reply_message.stickerMessage || message.reply_message.videoMessage) return message.reply(lang.BASE.NEED.format("animated sticker/video message"));
    return await sendGif(message)
});
cmd({
    pattern: 'bass',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBassAudio(message)
});
cmd({
    pattern: 'slow',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSlowAudio(message)
});
cmd({
    pattern: 'blown',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBlownAudio(message)
});
cmd({
    pattern: 'deep',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendDeepAudio(message);
});
cmd({
    pattern: 'earrape',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendErrapeAudio(message)
});
cmd({
    pattern: 'fast',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFastAudio(message)
});
cmd({
    pattern: 'fat',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFatAudio(message);
});
cmd({
    pattern: 'nightcore',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendNightcoreAudio(message);
});
cmd({
    pattern: 'reverse',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendReverseAudio(message);
});
cmd({
    pattern: 'squirrel',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit"
}, async (message) => {
    if (!message.reply_message.audioMessage) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSquirrelAudio(message);
});

cmd({
    pattern: 'mp3',
    desc: lang.CONVERTER.MP3_DESC,
    type: "converter"
}, (async (message) => {
    if (!message.reply_message.audio && !message.reply_message.video) return message.reply(lang.BASE.NEED.format("video message"));
    const opt = {
                title: config.AUDIO_DATA.split(/[|,;]/)[0] || config.AUDIO_DATA,
                body: config.AUDIO_DATA.split(/[|,;]/)[1],
                image: config.AUDIO_DATA.split(/[|,;]/)[2]
            }
    const AudioMeta = await AudioMetaData(await toAudio(await message.reply_message.download()), opt);
    return await message.client.sendMessage(message.from, {
        audio: AudioMeta,
        mimetype: 'audio/mpeg'
    }, {
        quoted: message.reply_message.data
    })
}));
