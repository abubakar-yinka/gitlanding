/* eslint-disable @typescript-eslint/no-namespace */
import { memo, useRef } from "react";
import { CardVariant } from "./components/CardVariant";
import type { CardVariantProps } from "./components/CardVariant";
import { Card } from "./components/Card";
import type { CardProps as CardNormalProps } from "./components/Card";
import { Typography } from "onyxia-ui";
import { getThemeApi } from "./theme";
import { useGuaranteedMemo, useNamedState, useConstCallback } from "powerhooks";
import { breakpointsValues } from "onyxia-ui";

type CardProps = CardProps.Normal | CardProps.Variant;
declare namespace CardProps {
    export type Normal = {
        type: "normal";
        cardProps: CardNormalProps;
    };

    export type Variant = {
        type: "variant";
        cardProps: CardVariantProps;
    };
}

export type CardSectionProps = {
    className?: string;
    title?: string;
    cards?: CardProps[];
    /**
     * specify the maximum screen width in witch the thumbnails
     * are displayed as columns.
     */
    breakpointForColumnDisplay?: number;
    showMoreMessage?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        hasTitle: boolean;
        breakpointForColumnDisplay: number;
    }>()((theme, { breakpointForColumnDisplay, hasTitle }) => ({
        "title": {
            "marginBottom": theme.spacing(7.5),
            "marginTop": theme.spacing(17.25),
            "display": "flex",
            "justifyContent": hasTitle ? "space-between" : "flex-end",
            ...(() => {
                const value = theme.spacing(13);

                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),
            "& h3": {
                "color": theme.colors.palette.orangeWarning.main,
                "cursor": "pointer",
            },
        },

        "cards": {
            "display": "flex",
            "flexWrap": "wrap",
            "justifyContent": "center",
            ...(theme.responsive.down(breakpointForColumnDisplay)
                ? {
                      "flexDirection": "column",
                      "alignItems": "center",
                      "paddingLeft": theme.spacing(4.5),
                      "paddingRight": theme.spacing(4.5),
                  }
                : {}),
        },
        "card": {
            "margin": theme.spacing(1.5),
            ...(theme.responsive.down(breakpointForColumnDisplay)
                ? {
                      "width": "100%",
                      "margin": [1.5, 0, 1.5, 0].map(spacing => `${theme.spacing(spacing)}px`).join(" "),
                  }
                : {}),
        },
    }));

    return { useClassNames };
};
export const CardSection = memo((props: CardSectionProps) => {
    const {
        title,
        cards,
        className,
        breakpointForColumnDisplay = breakpointsValues["sm"],
        showMoreMessage,
    } = props;

    const sectionRef = useRef<HTMLDivElement>(null);

    const { areExtraThumbNailsExposed, setAreExtraThumbNailsExposed } = useNamedState(
        "areExtraThumbNailsExposed",
        false,
    );

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        breakpointForColumnDisplay,
        "hasTitle": title !== undefined,
    });

    const exposeHiddenThumbNails = useConstCallback(async () => {
        setAreExtraThumbNailsExposed(!areExtraThumbNailsExposed);

        if (areExtraThumbNailsExposed || !sectionRef.current) {
            return;
        }

        await new Promise<void>(resolve => setTimeout(resolve, 1));

        window.scrollTo({
            "behavior": "smooth",
            "top": window.scrollY + sectionRef.current.getBoundingClientRect().top,
        });
    });

    return (
        <section ref={sectionRef} className={className}>
            {title && (
                <div className={classNames.title}>
                    <Typography variant="h2">{title}</Typography>

                    {cards && cards.length > 4 && (
                        <Typography onClick={exposeHiddenThumbNails} variant="h3">
                            {showMoreMessage ? showMoreMessage : "Show More"} ({cards.length})
                        </Typography>
                    )}
                </div>
            )}

            {cards && (
                <div className={classNames.cards}>
                    {cards
                        .slice(0, cards.length < 4 || areExtraThumbNailsExposed ? cards.length : 4)
                        .map((card, index) => {
                            if (card.type === "normal") {
                                return (
                                    <Card className={classNames.card} key={index} {...card.cardProps} />
                                );
                            }

                            return (
                                <CardVariant
                                    className={classNames.card}
                                    key={index}
                                    {...card.cardProps}
                                />
                            );
                        })}
                </div>
            )}
        </section>
    );
});
