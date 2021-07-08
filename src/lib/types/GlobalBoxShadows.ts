export interface GlobalBoxShadows {
  /**
   * Invisible shadow, but transitionable
   * (i.e., not assigned to 'none')
   */
  none: string
  /**
   * Invisible inset shadow, but transitionable
   * (i.e., not assigned to 'none')
   */
  noneInset: string

  /**
   * Default shadow (a subtler shadow, such as
   * for cards, headers, sidenavs, where just
   * a touch of z-axis depth is warranted)
   */
  default: string
  /**
   * Default inset shadow (a subtler shadow, such as
   * for cards, headers, sidenavs, where just
   * a touch of z-axis depth is warranted)
   */
  defaultInset: string

  /**
   * Pronounced shadow (a not-so-subtle shadow,
   * such as to draw attention to active states,
   * or modals)
   */
  pronounced: string
  /**
   * Pronounced inset shadow (a not-so-subtle shadow,
   * such as to draw attention to active states,
   * or modals)
   */
  pronouncedInset: string
}
