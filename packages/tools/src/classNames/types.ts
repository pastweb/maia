export type ClassesObj = {
  [className: string]: any;
};

export type ClassesArr = (number | string | ClassesObj | ClassesArr)[];

export type ClassesConfig = number | string | ClassesObj | ClassesArr;
