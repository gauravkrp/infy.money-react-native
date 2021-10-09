const iconsLib = {
  home: "M8.8 18.0951H6.4C5.9584 18.0951 5.6 17.7538 5.6 17.3332C5.6 16.9127 5.9584 16.5713 6.4 16.5713H8.8C9.2416 16.5713 9.6 16.9127 9.6 17.3332C9.6 17.7538 9.2416 18.0951 8.8 18.0951ZM9.6 15.0475H5.6C4.716 15.0475 4 15.7294 4 16.5713V18.0951C4 18.937 4.716 19.619 5.6 19.619H9.6C10.484 19.619 11.2 18.937 11.2 18.0951V16.5713C11.2 15.7294 10.484 15.0475 9.6 15.0475ZM17.6 7.42848H15.2C14.7584 7.42848 14.4 7.08715 14.4 6.66657C14.4 6.246 14.7584 5.90467 15.2 5.90467H17.6C18.0416 5.90467 18.4 6.246 18.4 6.66657C18.4 7.08715 18.0416 7.42848 17.6 7.42848ZM18.4 4.38086H14.4C13.516 4.38086 12.8 5.06276 12.8 5.90467V7.42848C12.8 8.27038 13.516 8.95229 14.4 8.95229H18.4C19.284 8.95229 20 8.27038 20 7.42848V5.90467C20 5.06276 19.284 4.38086 18.4 4.38086ZM18.4 17.3332C18.4 17.7538 18.0416 18.0951 17.6 18.0951H15.2C14.7584 18.0951 14.4 17.7538 14.4 17.3332V12.7618C14.4 12.3412 14.7584 11.9999 15.2 11.9999H17.6C18.0416 11.9999 18.4 12.3412 18.4 12.7618V17.3332ZM18.4 10.4761H14.4C13.516 10.4761 12.8 11.158 12.8 11.9999V18.0951C12.8 18.937 13.516 19.619 14.4 19.619H18.4C19.284 19.619 20 18.937 20 18.0951V11.9999C20 11.158 19.284 10.4761 18.4 10.4761ZM9.6 11.238C9.6 11.6586 9.2416 11.9999 8.8 11.9999H6.4C5.9584 11.9999 5.6 11.6586 5.6 11.238V6.66657C5.6 6.246 5.9584 5.90467 6.4 5.90467H8.8C9.2416 5.90467 9.6 6.246 9.6 6.66657V11.238ZM9.6 4.38086H5.6C4.716 4.38086 4 5.06276 4 5.90467V11.9999C4 12.8418 4.716 13.5237 5.6 13.5237H9.6C10.484 13.5237 11.2 12.8418 11.2 11.9999V5.90467C11.2 5.06276 10.484 4.38086 9.6 4.38086Z",
  profile: "M17.25 18.4H6.75054C6.18542 18.4 5.76812 17.8424 5.98127 17.3296C6.97021 14.9584 9.29354 13.6 11.9999 13.6C14.707 13.6 17.0304 14.9584 18.0193 17.3296C18.2325 17.8424 17.8152 18.4 17.25 18.4ZM8.73333 8.79998C8.73333 7.03518 10.1992 5.59998 11.9999 5.59998C13.8014 5.59998 15.2664 7.03518 15.2664 8.79998C15.2664 10.5648 13.8014 12 11.9999 12C10.1992 12 8.73333 10.5648 8.73333 8.79998ZM19.9645 18.1088C19.3708 15.4216 17.5138 13.4384 15.0696 12.5384C16.3648 11.5168 17.1202 9.86478 16.8425 8.05598C16.5208 5.95758 14.7389 4.27838 12.5879 4.03358C9.61857 3.69518 7.10006 5.95918 7.10006 8.79998C7.10006 10.312 7.81543 11.6592 8.93096 12.5384C6.48595 13.4384 4.62973 15.4216 4.03522 18.1088C3.81963 19.0856 4.6232 20 5.64318 20H18.3566C19.3774 20 20.1809 19.0856 19.9645 18.1088Z",
  asset: "M12.8 17.3332C12.8 17.7538 12.4416 18.0951 12 18.0951C11.5584 18.0951 11.2 17.7538 11.2 17.3332V6.66657C11.2 6.246 11.5584 5.90467 12 5.90467C12.4416 5.90467 12.8 6.246 12.8 6.66657V17.3332ZM12.8 4.38086H11.2C10.316 4.38086 9.6 5.06276 9.6 5.90467V18.0951C9.6 18.937 10.316 19.619 11.2 19.619H12.8C13.684 19.619 14.4 18.937 14.4 18.0951V5.90467C14.4 5.06276 13.684 4.38086 12.8 4.38086ZM7.2 17.3332C7.2 17.7538 6.8416 18.0951 6.4 18.0951C5.9584 18.0951 5.6 17.7538 5.6 17.3332V9.71419C5.6 9.29362 5.9584 8.95229 6.4 8.95229C6.8416 8.95229 7.2 9.29362 7.2 9.71419V17.3332ZM7.2 7.42848H5.6C4.716 7.42848 4 8.11038 4 8.95229V18.0951C4 18.937 4.716 19.619 5.6 19.619H7.2C8.084 19.619 8.8 18.937 8.8 18.0951V8.95229C8.8 8.11038 8.084 7.42848 7.2 7.42848ZM18.4 17.3332C18.4 17.7538 18.0416 18.0951 17.6 18.0951C17.1584 18.0951 16.8 17.7538 16.8 17.3332V14.2856C16.8 13.8651 17.1584 13.5237 17.6 13.5237C18.0416 13.5237 18.4 13.8651 18.4 14.2856V17.3332ZM18.4 11.9999H16.8C15.916 11.9999 15.2 12.6818 15.2 13.5237V18.0951C15.2 18.937 15.916 19.619 16.8 19.619H18.4C19.284 19.619 20 18.937 20 18.0951V13.5237C20 12.6818 19.284 11.9999 18.4 11.9999Z",
  liability: "M17.1262 13.421C15.9876 14.8809 14.7972 16.0494 13.4192 17.123C14.5609 17.7823 17.2395 18.9773 18.1074 18.1096C18.6998 17.5173 18.4276 15.6647 17.1262 13.421ZM12.0012 16.2011C13.5868 15.0413 15.0383 13.5902 16.1976 12.0049C15.0431 10.4253 13.5924 8.97255 12.0012 7.80877C10.4044 8.97575 8.95608 10.4301 7.80399 12.0049C8.96327 13.591 10.4156 15.0413 12.0012 16.2011ZM10.5824 17.123C9.2012 16.0462 8.01077 14.8777 6.87544 13.421C5.57404 15.6647 5.30178 17.5173 5.8942 18.1096C6.75408 18.9685 9.40958 17.8015 10.5824 17.123ZM6.87544 10.5889C8.01317 9.129 9.20359 7.96123 10.5824 6.88684C9.44231 6.22753 6.76287 5.03182 5.8942 5.90027C5.30178 6.49253 5.57404 8.34517 6.87544 10.5889ZM13.4192 6.88684C14.8004 7.96283 15.99 9.13139 17.1262 10.5889C20.0148 5.60732 17.8304 4.33738 13.4192 6.88684ZM18.1314 12.0049C22.4787 18.7977 18.7421 22.4518 12.0012 18.1391C5.27624 22.4415 1.50856 18.82 5.87105 12.0049C1.55327 5.25931 5.194 1.51572 12.0012 5.87073C18.7397 1.55963 22.4827 5.20663 18.1314 12.0049ZM12.8523 11.1564C13.3194 11.6242 13.3194 12.3825 12.8523 12.8494C12.3844 13.3172 11.626 13.3172 11.1581 12.8494C10.6902 12.3825 10.6902 11.6242 11.1581 11.1564C11.626 10.6887 12.3844 10.6887 12.8523 11.1564Z",
}

export default iconsLib;
