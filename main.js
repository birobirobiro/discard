const avatar = document.getElementById("avatar");
const id = document.getElementById("id");
const user = document.getElementById("user");
const banner = document.getElementById("banner");
const createdAccount = document.getElementById("account");
const searchForm = document.forms["user-code"];
const searchInput = searchForm.querySelector("input");
const badge = document.querySelector(".badge-default");
const button = document.getElementById("image-button");

const badgeUrls = {
  DISCORD_EMPLOYEE: "./assets/badges/discord_employee.svg",
  PARTNERED_SERVER_OWNER: "./assets/badges/partnered_server_owner.svg",
  HYPESQUAD_EVENTS: "./assets/badges/hypesquad_events.svg",
  BUGHUNTER_LEVEL_1: "./assets/badges/bughunterlevel1.svg",
  HOUSE_BRAVERY: "./assets/badges/hypesquadbravery.svg",
  HOUSE_BRILLIANCE: "./assets/badges/hypesquadbrilliance.svg",
  HOUSE_BALANCE: "./assets/badges/hypesquadbalance.svg",
  EARLY_SUPPORTER: "./assets/badges/earlysupporter.svg",
  TEAM_USER: "./assets/badges/team_user.svg",
  BUGHUNTER_LEVEL_2: "./assets/badges/bughunter_level_2.svg",
  VERIFIED_BOT: "./assets/badges/verified_bot.svg",
  EARLY_VERIFIED_BOT_DEVELOPER:
    "./assets/badges/early_verified_bot_developer.svg",
  DISCORD_CERTIFIED_MODERATOR:
    "./assets/badges/discord_certified_moderator.svg",
  BOT_HTTP_INTERACTIONS: "./assets/badges/bot_http_interactions.svg",
  SPAMMER: "./assets/badges/spammer.svg",
  ACTIVE_DEVELOPER: "./assets/badges/activedeveloper.svg",
  QUARANTINED: "./assets/badges/quarantined.svg",
  GATEWAY_PRESENCE: "./assets/badges/gateway_presence.svg",
  GATEWAY_PRESENCE_LIMITED: "./assets/badges/gateway_presence_limited.svg",
  GATEWAY_GUILD_MEMBERS: "./assets/badges/gateway_guild_members.svg",
  GATEWAY_GUILD_MEMBERS_LIMITED:
    "./assets/badges/gateway_guild_members_limited.svg",
  VERIFICATION_PENDING_GUILD_LIMIT:
    "./assets/badges/verification_pending_guild_limit.svg",
  EMBEDDED: "./assets/badges/embedded.svg",
  GATEWAY_MESSAGE_CONTENT: "./assets/badges/gateway_message_content.svg",
  GATEWAY_MESSAGE_CONTENT_LIMITED:
    "./assets/badges/gateway_message_content_limited.svg",
  APPLICATION_COMMAND_BADGE: "./assets/badges/application_command_badge.svg",
};

function getBadgeSrc(flag) {
  return badgeUrls[flag] || null;
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;

  if (searchValue === "") {
    alert("Por favor, preencha o campo com o ID do Discord!");
    return;
  }
  fetch(`https://discordlookup.mesavirep.xyz/v1/user/${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      const formattedDate = new Date(data.created_at).toLocaleDateString(
        "pt-BR",
        {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }
      );

      if (data.banner.link) {
        banner.style.backgroundImage = `url(${data.banner.link})`;
      } else {
        banner.style.backgroundImage = "none";
        banner.style.backgroundColor = data.banner.color;
      }

      avatar.src = data.avatar.link;
      id.innerText = data.id;
      user.innerText = data.tag;
      createdAccount.innerText = formattedDate;
      badge.innerHTML = data.badges.reduce((acc, flag) => {
        const badgeSrc = getBadgeSrc(flag);
        return `${acc} 
      <div class="badge">
        <img src="${badgeSrc}" alt="${flag}">
      </div>`;
      }, "");
    })
    .catch((error) => {
      console.log(error);
    });
});