import { Flex, FlexProps, Center } from '@chakra-ui/react';
import {Title} from '@components/Title';
import { intervalToDuration } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';


const DIGITS_COUNT = 2;
const DEFAULT_VALUE = 0;
const TIMER_INTERVAL = 1000;

function formatTimeUnit({ value = DEFAULT_VALUE }: TimeUnit): string[] {
  return value.toString().padStart(DIGITS_COUNT, '0').split('');
}

interface TimeUnit {
  value: number;
}
interface RenderTimeUnitProps {
  unitArray: string[];
  label: string;
}
interface TimerProps extends FlexProps{
  date: string;
}

interface TimeLeft {
  days: string[];
  hours: string[];
  minutes: string[];
}

export const Timer = observer(({ date, ...styled }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  function renderTimeUnit({ unitArray, label }: RenderTimeUnitProps) {
    return (
      <Flex direction="column" gap="12px">
        <Center gap="9px">
          {unitArray.map((digit, index) => (
            <Center
              h="70px"
              w="44px"
              borderRadius="8px"
              sx={{
                border: '0.743px solid var(--Colors-Colors-form-label-placeholder, #868686)',
                background: 'linear-gradient(137deg, rgba(23, 23, 23, 0.50) 11.14%, rgba(50, 48, 48, 0.50) 84.99%)',
              }}
              key={index}
            >
              <Title
                variant="custom"
                fontSize='44.5px'
                lineHeight='53.5px'
              >
                {digit}
              </Title>
            </Center>
          ))}
        </Center>
        <Center>
          <Title
            variant="custom"
            fontSize='18px'
            lineHeight='20px'
            textTransform='uppercase'
          >
            {label}
          </Title>
        </Center>
      </Flex>
    );
  }

  useEffect(() => {
    const releaseDate = new Date(date);
    if (isNaN(releaseDate.getTime())) {
      return;
    }
    const timer = setInterval(() => {
      const now = new Date();
      if (now >= releaseDate) {
        setTimeLeft({
          days: formatTimeUnit({ value: 0 }),
          hours: formatTimeUnit({ value: 0 }),
          minutes: formatTimeUnit({ value: 0 }),
        });
        clearInterval(timer);
      } else {
        try {
          const duration = intervalToDuration({ start: new Date(), end: new Date(date) });
          setTimeLeft({
            days: formatTimeUnit({ value: duration.days ?? 0 }),
            hours: formatTimeUnit({ value: duration.hours ?? 0 }),
            minutes: formatTimeUnit({ value: duration.minutes ?? 0 }),
          });
        } catch (error) {
          console.error('Failed to calculate duration:', error);
        }
      }
    }, TIMER_INTERVAL);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <Center gap='28px' {...styled}>
      {timeLeft && (
        <>
          {renderTimeUnit({
            unitArray: timeLeft.hours,
            label: 'hours',
          })}
          {renderTimeUnit({
            unitArray: timeLeft.minutes,
            label: 'minutes',
          })}
        </>
      )}
    </Center>
  );
});
