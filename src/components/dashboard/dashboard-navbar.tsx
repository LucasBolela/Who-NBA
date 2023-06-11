import {
  Anchor,
  Avatar,
  createStyles,
  getStylesRef,
  Group,
  Image,
  Navbar,
  rem,
} from "@mantine/core"
import { IconLogout, IconSettings } from "@tabler/icons-react"
import EagleLogo from "../../assets/images/Eagle-logo.png"
import { Link, useLocation } from "react-router-dom"
import { navigationItems } from "../../config/navigation"

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    width: "100%",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}))

export function DashboardNavbar() {
  const { pathname } = useLocation()
  const { classes, cx } = useStyles()

  const links = navigationItems.map((item) => (
    <Anchor
      className={cx(classes.link, {
        [classes.linkActive]: item.path === pathname,
      })}
      component={Link}
      to={item.path}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Anchor>
  ))

  return (
    <Navbar zIndex={10} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* <Title order={2}>Eagle</Title> */}
          <Anchor component={Link} to="/">
            <Image src={EagleLogo} width={100} />
          </Anchor>
          <Anchor component={Link} to="/account">
            <Avatar />
          </Anchor>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Anchor
          component="button"
          onClick={() => console.log("sair")}
          className={classes.link}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Sair</span>
        </Anchor>
      </Navbar.Section>
    </Navbar>
  )
}
