import { Flex, Image, Link } from "@chakra-ui/react";
import { Title } from "@components/Title";
import { ROUTER_LINKS } from "@core/constants/RouterLinks";
import rewardCupImg from "@assets/images/icons/rewardCup.svg";
import arrowRightImg from "@assets/images/icons/arrovRight.svg";

export function Reward() {
  return (
    <Flex
      sx={{
        w: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Image w="33px" h="35px" src={rewardCupImg} />
      <Title variant="medium" color="#FDFAFF">
        Bronze
      </Title>
      <Link href={ROUTER_LINKS.LEADERBOARD}>
        <Image w="16px" h="16px" src={arrowRightImg} />
      </Link>
    </Flex>
  );
}
