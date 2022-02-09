import { memo, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { Text } from "./theme";
import { breakpointsValues } from "./theme";
import UnfoldIcon from "@mui/icons-material/FormatLineSpacing";
import { useDomRect } from "powerhooks/useDomRect";
import { useConstCallback } from "powerhooks";
import { useClickAway } from "powerhooks";
import { GlDarkModeSwitch } from "./utils/GlDarkModeSwitch";
import { scrollableDivId } from "./GlTemplate";
import { Evt } from "evt";
import { useMergedClasses } from "tss-react";
import { GlGithubStarCount } from "./utils/GlGithubStarCount";

export type HeaderProps = {
    links: {
        label: string;
        href: string;
        onClick?: () => void;
    }[];
    title?: ReactNode;
    titleDark?: ReactNode;
    titleSmallScreen?: ReactNode;
    titleSmallScreenDark?: ReactNode;
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: string;
    githubButtonSize?: "normal" | "large";
    showGithubStarCount?: boolean;
};

export const Header = memo((props: HeaderProps) => {
    const {
        links,
        title,
        className,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
        showGithubStarCount,
        titleDark,
        titleSmallScreen,
        titleSmallScreenDark,
    } = props;

    const [isMenuUnfolded, setIsMenuUnfolded] = useState(false);

    const {
        domRect: { height: headerHeight },
        ref: headerRef,
    } = useDomRect();

    const {
        domRect: { height: linksHeight },
        ref: smallDeviceLinksRef,
    } = useDomRect();

    const linksRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [buttonsWidth, setButtonsWidth] = useState(0);
    const [titleWidth, setTitleWidth] = useState(0);

    useEffect(() => {
        if (!titleRef.current || !linksRef.current) {
            return;
        }

        setButtonsWidth(linksRef.current.clientWidth);
        setTitleWidth(titleRef.current.clientWidth);
    }, [titleRef.current?.clientWidth, linksRef.current?.clientWidth]);

    const { rootRef } = useClickAway(() => {
        if (!isMenuUnfolded) {
            return;
        }
        setIsMenuUnfolded(false);
    });

    const toggleMenu = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    useEffect(() => {
        const ctx = Evt.newCtx();
        const scrollableElement =
            window.document.getElementById(scrollableDivId);
        if (scrollableElement === null) {
            return;
        }
        Evt.from(ctx, scrollableElement, "scroll").attach(() => {
            if (headerHeight < scrollableElement.scrollTop) {
                setIsMenuUnfolded(false);
            }
        });
    }, [headerHeight]);

    let { classes, cx, theme } = useStyles({
        headerHeight,
        isMenuUnfolded,
        linksHeight,
        buttonsWidth,
        titleWidth,
    });

    classes = useMergedClasses(classes, props.classes);

    return (
        <header className={cx(classes.root, className)} ref={headerRef}>
            <div ref={rootRef} className={classes.headerInner}>
                <div ref={titleRef} className={classes.title}>
                    {typeof title === "string" ? (
                        <Text typo="subtitle">{title}</Text>
                    ) : (
                        ((): ReactNode => {
                            if (
                                theme.windowInnerWidth >= breakpointsValues.md
                            ) {
                                if (theme.isDarkModeEnabled) {
                                    return titleDark ?? title;
                                }
                                return title;
                            }

                            if (theme.isDarkModeEnabled) {
                                return (
                                    titleSmallScreenDark ??
                                    titleSmallScreen ??
                                    title
                                );
                            }
                            return titleSmallScreen ?? title;
                        })()
                    )}
                </div>

                <div ref={linksRef} className={classes.buttonAndLinkWrapper}>
                    <Links
                        className={classes.links}
                        links={links}
                        classes={{
                            "text": classes.text,
                            "linkWrapper": classes.linkWrapper,
                            "linkUnderline": classes.linkUnderline,
                        }}
                    />

                    {githubRepoUrl !== undefined && (
                        <GlGithubStarCount
                            repoUrl={githubRepoUrl}
                            size={githubButtonSize}
                            showCount={showGithubStarCount}
                            className={classes.githubStar}
                        />
                    )}

                    {enableDarkModeSwitch !== undefined &&
                        enableDarkModeSwitch && (
                            <div className={classes.darkModeSwitch}>
                                <GlDarkModeSwitch
                                    className={classes.darkModeSwitch}
                                />
                            </div>
                        )}

                    <div onClick={toggleMenu}>
                        <UnfoldIcon className={classes.unfoldIcon} />
                    </div>
                </div>

                <div className={classes.smallDeviceLinksWrapper}>
                    <div
                        className={classes.smallDeviceLinksInnerWrapper}
                        ref={smallDeviceLinksRef}
                    >
                        <Links
                            links={links}
                            className={classes.smallDeviceLinks}
                            classes={{
                                "link": classes.smallDeviceLink,
                                "text": classes.smallDeviceText,
                                "linkWrapper":
                                    classes.smallDeviceLinksInnerWrapper,
                                "linkUnderline":
                                    classes.smallDeviceLinkUnderline,
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
});

const useStyles = makeStyles<{
    headerHeight: number;
    isMenuUnfolded: boolean;
    linksHeight: number;
    buttonsWidth: number;
    titleWidth: number;
}>()(
    (
        theme,
        { headerHeight, isMenuUnfolded, linksHeight, buttonsWidth, titleWidth },
    ) => {
        const isCollapsibleMenu =
            buttonsWidth + theme.spacing(9) + theme.paddingRightLeft * 2 >
                theme.windowInnerWidth - titleWidth ||
            theme.windowInnerWidth < breakpointsValues.sm;

        return {
            "root": {
                ...theme.spacing.rightLeft(
                    "padding",
                    `${theme.paddingRightLeft}px`,
                ),
                "position": "relative",
            },
            "headerInner": {
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "position": "relative",
            },
            "unfoldIcon": {
                "display": "none",
                "pointerEvents": "none",
                ...(isCollapsibleMenu
                    ? {
                          "display": "block",
                          "pointerEvents": "unset",
                      }
                    : {}),
                "marginLeft": theme.spacing(2),
            },
            "smallDeviceLinksWrapper": {
                "position": "absolute",
                "backgroundColor": theme.colors.useCases.surfaces.background,
                "left": -theme.paddingRightLeft,
                "top": headerHeight + theme.spacing(3),
                "width": window.innerWidth,
                "opacity": 0,
                "height": 0,
                "overflow": "hidden",
                "pointerEvents": "none",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "flex-start",
                "justifyContent": "center",
                "transition": "height 300ms, border-top-color 300ms",
                ...theme.spacing.rightLeft(
                    "padding",
                    `${theme.paddingRightLeft}px`,
                ),
                ...(isCollapsibleMenu
                    ? {
                          "borderTop": isMenuUnfolded
                              ? `solid 1px ${theme.colors.useCases.typography.textSecondary}`
                              : undefined,
                          "height": isMenuUnfolded ? linksHeight : 0,
                          "opacity": 0.94,
                          "pointerEvents": "unset",
                      }
                    : {}),
            },

            "smallDeviceLinksInnerWrapper": {
                ...theme.spacing.topBottom("padding", `${theme.spacing(3)}px`),
            },

            "smallDeviceLinks": {
                "flexDirection": "column",
                "display": "flex",
                ...(isCollapsibleMenu
                    ? {
                          "opacity": 1,
                          "pointerEvents": "unset",
                      }
                    : {}),
            },

            "darkModeSwitch": {
                ...(theme.windowInnerWidth < breakpointsValues.md
                    ? {
                          ...theme.spacing.rightLeft(
                              "margin",
                              `${theme.spacing(2)}px`,
                          ),
                      }
                    : {}),
            },
            "buttonAndLinkWrapper": {
                "position": "absolute",
                "right": 0,
                "display": "flex",
                "alignItems": "center",
            },
            "githubStar": {
                ...(theme.windowInnerWidth >= breakpointsValues.md
                    ? {
                          "paddingRight": theme.spacing(2),
                      }
                    : {}),
            },
            "links": {
                ...(() => {
                    if (isCollapsibleMenu) {
                        return {
                            "opacity": 0,
                            "pointerEvents": "none",
                        };
                    }
                })(),
            },
            "title": {},
            "text": {},
            "linkWrapper": {},
            "linkUnderline": {},
            "smallDeviceText": {},
            "smallDeviceLink": {
                "margin": 0,
            },
            "smallDeviceLinkUnderline": {},
            "darkModeSwitchWrapper": {},
        };
    },
);

const { Links } = (() => {
    type LinksProps = {
        links: HeaderProps["links"];
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    };

    const Links = memo((props: LinksProps) => {
        const { links, className } = props;

        let { classes, cx } = useStyles();

        classes = useMergedClasses(classes, props.classes);

        return (
            <div className={cx(classes.links, className)}>
                {links.map(({ href, label, onClick }) => (
                    <div key={label} className={classes.linkWrapper}>
                        <Link
                            className={classes.link}
                            href={href}
                            label={label}
                            onClick={onClick}
                            classes={{
                                "text": classes.text,
                                "underline": classes.linkUnderline,
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    });

    const useStyles = makeStyles()({
        "links": {
            "display": "flex",
            "justifyContent": "center",
            "flex": 1,
        },
        "linkWrapper": {
            "display": "flex",
            "cursor": "pointer",
        },
        "text": {},
        "linkUnderline": {},
        "link": {},
    });

    return { Links };
})();

const { Link } = (() => {
    type LinkProps = HeaderProps["links"][number] & {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    };

    const Link = memo((props: LinkProps) => {
        const { href, label, onClick, className } = props;
        let { classes, cx } = useStyles();
        classes = useMergedClasses(classes, props.classes);

        return (
            <div
                onClick={onClick ?? (() => (window.location.href = href))}
                className={cx(classes.root, className)}
            >
                <Text typo="label 1" className={classes.text}>
                    {label}
                </Text>
                <div className={classes.underline}></div>
            </div>
        );
    });

    const useStyles = makeStyles<void, "underline">()(
        (theme, _params, classes) => {
            return {
                "root": {
                    "display": "flex",
                    "flexDirection": "column",
                    "position": "relative",
                    ...theme.spacing.rightLeft(
                        "margin",
                        `${theme.spacing(3)}px`,
                    ),
                    "&: hover": {
                        "cursor": "pointer",
                    },
                    [`&:hover .${classes.underline}`]: {
                        "width": "110%",
                        ...(theme.windowInnerWidth < breakpointsValues.md
                            ? {
                                  "width": "50%",
                              }
                            : {}),
                    },
                    ...(theme.windowInnerWidth < breakpointsValues.md
                        ? {
                              ...theme.spacing.topBottom(
                                  "margin",
                                  `${theme.spacing(3)}px`,
                              ),
                          }
                        : {}),
                },
                "underline": {
                    "width": 0,
                    "position": "relative",
                    "left":
                        theme.windowInnerWidth >= breakpointsValues.md
                            ? "-5%"
                            : "25%",
                    "top": theme.spacing(1),
                    "height": 1,
                    "backgroundColor":
                        theme.colors.useCases.typography.textPrimary,
                    "transition": "width 200ms",
                },
                "text": {
                    ...theme.spacing.rightLeft(
                        "padding",
                        `${theme.spacing(2)}px`,
                    ),
                },
            };
        },
    );
    return { Link };
})();
